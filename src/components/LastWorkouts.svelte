<script lang="ts">
    import Card from "./Card.svelte";
    import SupabaseService from "../api/supabase-service.ts";
    import {onDestroy, onMount} from "svelte";
    import type {Plan} from "../types/Plan.ts";
    import Session from "../session.ts";
    import type {RealtimeChannel} from "@supabase/supabase-js";
    import Utils from "../Utils.ts";
    import KraftIcon from "../icons/workout-icons/KraftIcon.svelte";
    import RunningIcon from "../icons/workout-icons/RunningIcon.svelte";
    import MobilityIcon from "../icons/workout-icons/MobilityIcon.svelte";
    import ClimbingIcon from "../icons/workout-icons/ClimbingIcon.svelte";
    import Button from "./Button.svelte";
    import Calendar from "./Calendar.svelte";
    import {isLoggedIn} from "../store.ts";


    let subscription: RealtimeChannel;
    let events: any = [];


    onMount(async () => {
        events = await fetchEvents();

        subscription = SupabaseService.subscribeToTable(
            "events",
            "events-channel",
            onInsert,
            onUpdate
        );
        subscription.subscribe();
    });

    async function fetchEvents() {
        try {
            let result = (await SupabaseService.getEvents()).events;
            return getLastFiveEvents(Utils.sortDates(result));
        } catch (err: any) {
            console.log(err);
        }
    }

    function getLastFiveEvents(eventList: any) {
        return eventList.slice(0, 5);
    }

    function showCalendar() {
        if (window) {
            document.getElementById("calendar")?.classList.remove("hidden");
        }
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
        events = await fetchEvents();
    }

    onDestroy(() => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });

</script>


<main>
    <Card title="Letzte Einheiten">

        {#if events !== undefined}
            {#each events as item}
                <div class="flex justify-between">
                    <div class="flex gap-2">
                        {#if item.title === "Bouldern" || item.title === "Klettern"}
                            <ClimbingIcon/>
                        {:else if item.title === "Laufen"}
                            <RunningIcon/>
                        {:else if item.title === "Mobility" || item.title === "Stretching" || item.title === "Dehnen"}
                            <MobilityIcon/>
                        {:else}
                            <KraftIcon/>
                        {/if}
                        <p class="text-custom-silver mt-1">{item.title}</p>
                    </div>
                    <p class="text-custom-silver text-sm">{Utils.formatDateToShortString(item.date)}</p>
                </div>
            {/each}
        {/if}

        <div class="flex justify-end mt-2">
            <Button text="Alle Einheiten" type="primary" width="w-full" onClick={showCalendar}/>
        </div>

        <div id="calendar" class="hidden">
            <Calendar/>
        </div>
    </Card>

</main>
