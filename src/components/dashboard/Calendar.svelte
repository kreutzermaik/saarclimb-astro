<script lang="ts">
    import * as FullCalendar from "@fullcalendar/core";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import InteractionPlugin from "@fullcalendar/interaction";
    import {onDestroy, onMount} from "svelte";
    import SupabaseService from "../../api/supabase-service.ts";
    import LoadingSpinner from "../_ui/LoadingSpinner.svelte";
    import type {RealtimeChannel} from "@supabase/supabase-js";
    import Card from "../_ui/Card.svelte";
    import {colors} from "../../TailwindColors";
    import AddEventDialog from "./AddEventDialog.svelte";


    let subscription: RealtimeChannel;
    let calendarEl: any;
    let events: any = [];
    let selectedDate: any;

    /**
     * create fullcalendar with config
     */
    function createCalendar() {
        events.map((event: any) => {
            event.color = getColors(event).color;
            event.textColor = getColors(event).textColor;
        });

        let calendar = new FullCalendar.Calendar(calendarEl as HTMLDivElement, {
            plugins: [dayGridPlugin, InteractionPlugin],
            initialView: "dayGridMonth",
            firstDay: 1,
            locale: "de",
            dateClick: handleDateClick,
            events: events
        });

        calendar.render();
    }

    /**
     * get colors for events
     * @param event
     */
    function getColors(event: any) {
        let color: any = '';
        let textColor = '#fff';
        if (event.title === 'Bouldern' || event.title === 'Klettern') {
            color = colors["custom-orange"];
        } else if (event.title === 'Laufen') {
            color = colors["custom-pink"];
        } else if (event.title === 'Mobility' || event.title === 'Stretching' || event.title === 'Dehnen') {
            color = colors["custom-turquiose"];
        } else {
            color = colors.accent;
        }
        return {color: color, textColor: textColor};
    }


    /**
     * fetch all events for current user
     * @returns
     */
    async function fetchEvents() {
        try {
            let result = (await SupabaseService.getEvents()).events;
            return parseAndSetEvents(result);
        } catch (err: any) {
            console.log(err);
        }
    }

    /**
     * parse events from supabase to calendar events
     * @param eventList
     * @returns
     */
    function parseAndSetEvents(eventList: any) {
        let eventArray: any[] = [];
        eventList.map((item: any) => {
            eventArray.push({title: item.title, date: item.date});
        });
        return eventArray;
    }

    /**
     * set selected date on date click
     * @param event
     */
    function handleDateClick(event: any) {
        selectedDate = event.dateStr;
        openDialog();
    }

    /**
     * open dialog for adding a new event
     */
    function openDialog() {
        document.getElementById("event-dialog")?.classList.remove("hidden");
    }

    /**
     * on subscription insert
     * @param payload
     */
    function onInsert(payload: any) {
        events.push(payload.new);
        if (events) createCalendar();
    }

    /**
     * on subscription update
     */
    async function onUpdate() {
        events = await fetchEvents();
    }

    function onDelete(payload: any) {
        events = events.filter((item: any) => item.id !== payload.old.id);
        if (events) createCalendar();
    }

    /**
     * subscribe to events table on mount
     */
    onMount(async () => {
        subscription = SupabaseService.subscribeToTable(
            "events",
            "event-channel",
            onInsert,
            onUpdate,
            onDelete
        );
        subscription.subscribe();

        events = await fetchEvents();

        if (events) {
            createCalendar();
        }
    });

    /**
     * remove subscription on cleanup
     */
    onDestroy(() => {
        subscription.unsubscribe();
    });
</script>

<div id="calendar" class="mt-4">
    <div class="text-gray-200">
        {#if events}
            <div
                    class="max-sm:h-screen"
                    style="max-height: 50vh"
                    bind:this={calendarEl}
            />
        {:else}
            <LoadingSpinner/>
        {/if}
    </div>
    <AddEventDialog propsDate={selectedDate}/>
</div>
