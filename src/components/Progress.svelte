<script lang="ts">
    import {isLoggedIn} from "../store.ts";
    import Card from "./Card.svelte";
    import NotLoggedIn from "./NotLoggedIn.svelte";
    import Button from "./Button.svelte";
    import SupabaseService from "../api/supabase-service.ts";
    import type {Progress} from "../types/Progress.ts";
    import type {ProgressItem} from "../types/ProgressItem.ts";
    import {onMount, onDestroy} from "svelte";
    import type {RealtimeChannel} from "@supabase/supabase-js";
    import Toast from "../Toast.ts";
    import {currentGym, currentGymId, gyms} from "../store.ts";
    import Chip from "./Chip.svelte";
    import PlusIcon from "../icons/PlusIcon.svelte";
    import MinusIcon from "../icons/MinusIcon.svelte";
    import type {GradeItem} from "../types/GradeItem.ts";

    let subscription: RealtimeChannel;

    let usersGym: any;
    let selectedGym: any;
    let progress: Progress[] = [];
    let color: string = '';

    /**
     * fetch gym for current user
     * @returns
     */
    async function fetchUsersCurrentGym() {
        try {
            let result = (await SupabaseService.getCurrentGym()).gym;
            usersGym = result;
            return result;
        } catch (err: any) {
            console.log(err);
        }
    }

    /**
     * fetch progress object
     * @returns
     */
    async function fetchProgress(gymId: number) {
        try {
            let result = (await SupabaseService.getProgress(gymId)).progress;
            if (result) progress = result as Progress[];
            return progress;
        } catch (err: any) {
            console.log(err);
        }
    }

    /**
     * update gym name in the select field
     * update different values that are affected by the gym change
     * @param e
     */
    async function changeGym(e: any) {
        const gym = e.target.value;
        selectedGym = gym;
        const {id, logo, grades} = (await SupabaseService.getGymByName(gym)).gym;
        currentGymId.set(await fetchUsersCurrentGym());
        if (await $currentGymId !== undefined && await $currentGymId !== null) {
            await SupabaseService.updateUserGym(id);
        }
        currentGym.set({id: id, name: gym, logo: logo, grades: grades});
        await fetchProgress(id);
    }

    /**
     * push new entry for progress table and set points value in array to 0
     * @param grades
     */
    async function initProgressDataForGym(grades: ProgressItem[]) {
        let array: any[] = [];
        grades.map((item: ProgressItem) => {
            array.push({grade: item, value: 0});
        });
        await SupabaseService.insertProgress(array, $currentGym.id);
        await fetchProgress($currentGym.id);
        new Toast().push({content: Toast.GYM_VALUES_ADDED_MESSAGE, style: 'success', duration: 3000});
        await fetchProgress($currentGym.id);

        let currentPoints = (await SupabaseService.getCurrentPoints()).points?.points;
        currentPoints.push({gymId: $currentGym.id, value: 0});
        await SupabaseService.updateUserPoints(currentPoints);
    }

    /**
     * update progress value
     * @param value
     * @param grade
     */
    async function updateProgress(value: number, grade: string) {
        progress.map((item: Progress) => {
            if (item.gymid === $currentGym.id) {
                item.progress.find((item: ProgressItem) => item.grade === grade).value = value;
            }
        });

        await SupabaseService.updateProgress(
            progress.find((item: Progress) => item.gymid === $currentGym.id)
                .progress,
            $currentGym.id
        );

        let currentUserPointsArray = await SupabaseService.getCurrentPoints();
        currentUserPointsArray.points?.points.map((item: any) => {
            if ($currentGym) {
                if (Number(item.gymId) === $currentGym.id) {
                    item.value = calculatePoints();
                }
            }
        });

        await SupabaseService.updateUserPoints(currentUserPointsArray.points?.points);
    }

    /**
     * calculate points for current user
     * every grade has a multiplier that is increased by 2 for every grade
     * @returns
     */
    function calculatePoints(): number {
        let points = 0;
        progress.map((item: Progress) => {
            let multiplier = 2;
            item.progress.map((item: any, i: number) => {
                if (i > 0) {
                    multiplier += 2;
                }
                points += multiplier * item.value;
            });
        });
        return points;
    }

    /**
     * increment input value by 1 and update progress
     * @param item
     */
    function incrementValue(item: ProgressItem) {
        const newValue = Number(item.value) + 1;
        let inputElement: any = document.getElementById(`input-${item.grade}`);
        inputElement.value = newValue;
        updateProgress(newValue, item.grade);
    }

    /**
     * decrement input value by 1 and update progress
     * @param item
     */
    function decrementValue(item: ProgressItem) {
        const newValue = Number(item.value) - 1;
        let inputElement: any = document.getElementById(`input-${item.grade}`);
        if (newValue >= 0) {
            inputElement.value = newValue;
            updateProgress(newValue, item.grade);
        }
    }

    /**
     * hotfix for <Chip/> Bug
     * @param color
     */
    function setColor(color: GradeItem) {
        if (import.meta.env.DEV) {
            color = color.grade;
        }
        switch (color) {
            case 'grün':
                color = 'bg-custom-green';
                break;
            case 'gelb':
                color = 'bg-custom-yellow';
                break;
            case 'orange':
                color = 'bg-custom-orange';
                break;
            case 'blau':
                color = 'bg-custom-blue';
                break;
            case 'weiß':
                color = 'bg-white text-black';
                break;
            case 'türkis':
                color = 'bg-custom-turquiose';
                break;
            case 'schwarz':
                color = 'bg-black';
                break;
            case 'rot':
                color = 'bg-custom-red';
                break;
            case 'pink':
                color = 'bg-custom-pink';
                break;
        }
        return color;
    }

    /**
     * return grade value by grade name
     * @param grade
     */
    function getGymGradeValueByName(grade: GradeItem) {
        if (import.meta.env.DEV) grade = grade.grade;
        return $currentGym.grades?.find(item => item.grade === grade)?.value;
    }

    /**
     * on subscription insert
     * @param payload
     */
    function onInsert(payload: any) {
        progress.push(payload.new);
    }

    /**
     * on subscription update
     */
    async function onUpdate() {
        await fetchProgress($currentGym.id);
    }

    onMount(async () => {
        subscription = SupabaseService.subscribeToTable(
            "progress",
            "progress-channel",
            onInsert,
            onUpdate
        );
        subscription.subscribe();

        let currentGymId: number = 0;
        let currentGymName: string = "";

        if ($currentGym) {
            currentGymId = $currentGym.id;
            currentGymName = $currentGym.name;
        } else {
            currentGymId = (await fetchUsersCurrentGym())?.gym;
            if (currentGymId) {
                currentGymName = (await SupabaseService.getGymNameById(currentGymId)).gym?.name;
            }
        }

        const {id, name, logo, grades} = (
            await SupabaseService.getGymByName(currentGymName)
        ).gym;

        currentGym.set({id: id, name: name, logo: logo, grades: grades});
        await fetchProgress(currentGymId);
    });

    onDestroy(() => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });

    // Reaktiver Zustand für den Wert des Eingabefelds
    let value = 0; // Startwert; kann auch initial von außen vorgegeben werden

    // Funktionen zum Inkrementieren und Dekrementieren
    function increment() {
        value += 1;
    }

    function decrement() {
        if (value > 0) {
            value -= 1;
        }
    }
</script>


{#if $isLoggedIn}
    <main class="mb-20">
        <Card title="Boulderhalle auswählen">
            <label for="gyms" class="block mb-2 text-sm text-left font-medium text-custom-silver">
                Aktuelle Halle
            </label>
            <select
                    id="gyms"
                    on:change={e => changeGym(e)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option selected>
                    {#if $currentGym}
                        {$currentGym.name}
                    {:else if $currentGym}
                        {$currentGym.name}
                    {:else}
                        Bitte auswählen...
                    {/if}
                </option>
                {#if $gyms}
                    {#each $gyms as gym}
                        {#if $currentGym && gym.name !== $currentGym.name}
                            <option value={gym.name}>{gym.name}</option>
                        {:else if $currentGym && gym.name !== $currentGym.name}
                            <option value={gym.name}>{gym.name}</option>
                            {$currentGym.name}
                        {/if}
                    {/each}
                {/if}
            </select>
        </Card>

        <br>

        <Card title="Absolvierte Routen">
            {#if progress.length > 0}
                {#each progress as item}
                    {#each item.progress as progressItem, index}
                        <div class="flex justify-between">
                            <Chip text={getGymGradeValueByName(progressItem?.grade)?.toString()}
                                  className={`${setColor(progressItem?.grade)}`}
                            />
                            <div class="flex items-center">
                                <button class="mb-[1em]" on:click={() => decrementValue(progressItem)}>
                                    <MinusIcon/>
                                </button>
                                <input type="number" id={`input-${progressItem?.grade}`} value={progressItem?.value}
                                       on:change={e => updateProgress(e.target?.value, progressItem?.grade)} min="0"
                                       class="bg-gray-100 text-gray-900 rounded-lg lg:w-96 w-32 mb-[1em] mx-2"/>
                                <button class="mb-[1em]" on:click={() => incrementValue(progressItem)}>
                                    <PlusIcon/>
                                </button>
                            </div>
                        </div>

                        <!--<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-3 py-2 w-2/12">
                            <span id={`button-minus-${index}`} class="minus-button">
                                <Button
                                        text="-"
                                        type="secondary"
                                        opacity="opacity-80"
                                        textSize="text-lg"
                                        paddingX="px-3.5"
                                        disabled="{progressItem.value <= 0}"
                                        onClick={() => decrementValue(progressItem)}
                                />
                            </span>
                                <input
                                        type="number"
                                        name="number"
                                        id={`input-${progressItem.grade}`}
                                        min={0}
                                        on:change={e => updateProgress(e.target?.value, progressItem.grade)}
                                        value={progressItem.value}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-14 lg:w-44"
                                />
                                <span id={`button-plus-${index}`} class="plus-button">
                                <Button
                                        text="+"
                                        type="secondary"
                                        opacity="opacity-80"
                                        textSize="text-lg"
                                        paddingX="px-3.5"
                                        onClick={() => incrementValue(progressItem)}
                                />
                            </span>
                            </td>
                            <td class="px-3 py-2 w-9/12">
                                <div class="flex gap-5">
                                    <div class={`${setColor(progressItem.grade.grade)} p-2.5 rounded-md w-full`}>
                                        {getGymGradeValueByName(progressItem.grade.grade)}
                                    </div>
                                </div>
                            </td>
                        </tr>-->
                    {/each}
                {/each}
            {:else}
                <Button
                        text="Starte mit dieser Boulderhalle!"
                        type="secondary"
                        onClick={() => initProgressDataForGym($currentGym.grades?.map(item => item.grade))}
                />
            {/if}

        </Card>


    </main>
{:else}
    <NotLoggedIn/>
{/if}