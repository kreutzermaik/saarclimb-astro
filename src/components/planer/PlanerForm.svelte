<script lang="ts">

    import Card from "../_ui/Card.svelte";
    import ArrowLeft from "../../icons/ArrowLeft.svelte";
    import {MultiSelect, Button} from 'flowbite-svelte';
    import {getWorkoutList} from "../../api/Workouts.ts";
    import SupabaseService from "../../api/supabase-service.ts";
    import Toast from "../../Toast.ts";
    import type {Plan} from "../../types/Plan.ts";
    import type {RealtimeChannel} from "@supabase/supabase-js";
    import {onDestroy, onMount} from "svelte";

    let subscription: RealtimeChannel;

    let plan: Plan[] = [];

    async function fetchPlan() {
        try {
            return (await SupabaseService.getPlan()).planer.plan;
        } catch (err: any) {
            console.log(err);
        }
    }

    /**
     * update plan in supabase
     */
    function updatePlan() {
        eliminateValuesWithOnlyOneCharacter();
        try {
            SupabaseService.updatePlan(plan);
            new Toast().push({content: Toast.PLAN_UPDATED_MESSAGE, style: 'success', duration: 3000});
        } catch (err: any) {
            new Toast().push({title: Toast.PLAN_UPDATED_ERROR_MESSAGE, style: 'error', duration: 5000});
        }
    }

    /**
     * on subscription insert
     * @param payload
     */
    function onInsert(payload: any) {
        // plan = (prev: any) => [...prev, payload.new];
    }

    /**
     * on subscription update
     */
    async function onUpdate() {
        plan = await fetchPlan();
    }

    onMount(async () => {
        subscription = SupabaseService.subscribeToTable(
            "progress",
            "planer-channel",
            onInsert,
            onUpdate
        );
        subscription.subscribe();

        plan = await fetchPlan();
    });

    onDestroy(() => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });

    /**
     * Das Multiselect speichert manchmal einzelne Characters als value. Diese werden hier entfernt.
     * @param e
     */
    function eliminateValuesWithOnlyOneCharacter() {
        plan.map((item: any) => {
            if (Array.isArray(item.value)) {
                item.value = item.value.filter((value) => value.length > 1);
            }
        });
    }
</script>


<div>
    <div class="settings-icon text-gray-300">
        <a href="/dashboard">
            <div class="flex gap-4 items-center">
                <ArrowLeft/>
                <strong>Zurück</strong>
            </div>
        </a>
    </div>

    <Card title="Plane deine Woche">
        {#each plan as item}
            <div class="flex justify-between gap-4 items-center my-4">
                <div class="w-1/3">{item?.day}</div>
                <div class="w-full">
                    <MultiSelect items={getWorkoutList()} bind:value={item.value}/>
                </div>
            </div>
        {/each}

        <Button class="w-full" color="blue" on:click={updatePlan}>Speichern</Button>
    </Card>
</div>