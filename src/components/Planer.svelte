<script lang="ts">
    import Card from "./Card.svelte";
    import ChipVertical from "./ChipVertical.svelte";
    import SupabaseService from "../api/supabase-service.ts";
    import PointIcon from "../icons/PointIcon.svelte";
    import {onDestroy, onMount} from "svelte";
    import CheckboxIcon from "../icons/CheckboxIcon.svelte";
    import type {Plan} from "../types/Plan.ts";
    import type {Event} from "../types/Event.ts";
    import Session from "../session.ts";
    import type {RealtimeChannel} from "@supabase/supabase-js";
    import Utils from "../Utils.ts";
    import KraftIcon from "../icons/workout-icons/KraftIcon.svelte";
    import ClimbingIcon from "../icons/workout-icons/ClimbingIcon.svelte";
    import RunningIcon from "../icons/workout-icons/RunningIcon.svelte";
    import MobilityIcon from "../icons/workout-icons/MobilityIcon.svelte";

    const TEXT_KEINE_EINHEITEN = 'Es stehen keine Einheiten an.';

    let subscription: RealtimeChannel;
    let plans: any[];
    let newEvent: Event;

    let selectedDay = {
        day: new Date().toLocaleDateString('de-DE', {weekday: 'long'}),
        value: '',
        checked: false
    };

    onMount(async () => {
        plans = await fetchPlan();
        setInitialDay();


        subscription = SupabaseService.subscribeToTable(
            "planer",
            "planer-channel",
            onInsert,
            onUpdate
        );
        subscription.subscribe();
    });

    function setInitialDay() {
        plans.filter((item) => {
            if (item.day === new Date().toLocaleDateString('de-DE', {weekday: 'long'})) {
                selectedDay = item;
            }
        });
    }

    async function fetchPlan() {
        try {
            return (await SupabaseService.getPlan()).planer.plan;
        } catch (err: any) {
            console.log(err);
        }
    }

    async function updateCalendar(item: Plan) {
        let checked = !item.checked;
        let event = item.value;
        let date = Utils.formatDate(Utils.getDateByDayString(item.day));
        newEvent = {
            title: event,
            date: date,
            userid: await Session.getCurrentUserId(),
            location: '',
        };
        // open AskLocationDialog if event is a climbing event
        /*        if (event.match("Kletter") || event.match("Boulder") || event.match("Climb")) {
                    if (item.checked) openDialog();
                    await SupabaseService.removeEventByDate(event, date);
                } else {*/
        item.checked = checked;
        if (checked) await SupabaseService.addEvent(newEvent);
        else await SupabaseService.removeEvent(newEvent);
        /*}*/
    }

    function updatePlan(item: Plan) {
        updateCalendar(item);
        item.checked = !item.checked;
        SupabaseService.updatePlan(plans);
    }

    function getDateHeader(day: string) {
        const date = Utils.getDateByDayString(day);
        if (date.getTime() === new Date().getTime()) {
            day = "Heute";
        }
        const formattedDate = date.toLocaleDateString('de-DE', {month: 'long', day: '2-digit'});
        return day + " (" + formattedDate + ")";
    }

    /**
     * on subscription insert
     * @param payload
     */
    function onInsert(payload: any) {
        // plans = (prev: any) => [...prev, payload.new];
    }

    /**
     * on subscription update
     */
    async function onUpdate() {
        plans = await fetchPlan();
    }

    onDestroy(() => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });

</script>


<main>
    <Card title="Wochenplan">

        <div class="flex justify-between">
            {#if plans !== undefined && plans.length > 0}
                {#each plans as item}
                    <div class="bg-light-grey text-light-text">
                        <button class={item.value === '' ? 'cursor-default' : 'cursor-pointer'}>
                            {item.day.slice(0, 2)}
                        </button>

                        <ChipVertical content="{item.value}" onClick={() => selectedDay = item}/>
                    </div>
                {/each}
            {/if}
        </div>

        <div class="mt-8">
            <h3 class="text-lg">📅 {getDateHeader(selectedDay.day)}</h3>
            <br>
            <div class="text-lighter">
                {#if selectedDay.value !== '' && selectedDay.value !== TEXT_KEINE_EINHEITEN}
                    <div class="flex gap-0 justify-between">
                        <div class="flex gap-2">
                            {#if selectedDay.value === "Bouldern" || selectedDay.value === "Klettern"}
                                <ClimbingIcon/>
                            {:else if selectedDay.value === "Laufen"}
                                <RunningIcon/>
                            {:else if selectedDay.value === "Mobility" || selectedDay.value === "Stretching" || selectedDay.value === "Dehnen"}
                                <MobilityIcon/>
                            {:else}
                                <KraftIcon/>
                            {/if}
                            <p class="text-custom-silver mt-1">{selectedDay.value}</p>
                        </div>
                        <div class="checkbox-wrapper ml-4 mt-0.5">
                            <label class="toggleButton">
                                <input type="checkbox" checked={selectedDay.checked} bind:value={selectedDay.checked}
                                       on:click={() => updatePlan(selectedDay)}>
                                <div>
                                    <CheckboxIcon/>
                                </div>
                            </label>
                        </div>
                    </div>
                {:else }
                    <p>{TEXT_KEINE_EINHEITEN}</p>
                {/if}
            </div>
        </div>

    </Card>
</main>
