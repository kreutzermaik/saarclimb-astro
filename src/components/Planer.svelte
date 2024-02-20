<script lang="ts">
    import Card from "./Card.svelte";
    import ChipVertical from "./ChipVertical.svelte";
    import type {User} from "../types/User.ts";
    import SupabaseService from "../api/supabase-service.ts";

    const TEXT_KEINE_EINHEITEN = 'Es stehen keine Einheiten an.';

    let plan = [
        {day: 'Montag', value: ''},
        {day: 'Dienstag', value: 'Bouldern'},
        {day: 'Mittwoch', value: ''},
        {day: 'Donnerstag', value: ''},
        {day: 'Freitag', value: 'Kraft'},
        {day: 'Samstag', value: ''},
        {day: 'Sonntag', value: ''},
    ];

    $: selectedDay = {day: 'Heute', value: TEXT_KEINE_EINHEITEN};

    let users = [] as User[];

    async function fetchAllUsers() {
        try {
            let result = (await SupabaseService.getAllUsers()).users;
            users = result as User[];
            console.log(users)
        } catch (err: any) {
            console.log(err);
        }
    }

    fetchAllUsers();

</script>


<main>
    <Card title="Wochenplan">

        <div class="flex justify-between">
            {#each plan as item}
                <div class="bg-light-grey text-light-text">
                    <button class={item.value === '' ? 'cursor-default' : 'cursor-pointer'}>
                        {item.day.slice(0, 2)}
                    </button>

                    <ChipVertical content="{item.value}" onClick={() => selectedDay = item} />
                </div>
            {/each}
        </div>

        <div class="mt-8">
            <h3 class="text-lg">📅 {selectedDay.day}</h3>
            <p class="text-lighter">
                {selectedDay.value !== '' ? selectedDay.value : TEXT_KEINE_EINHEITEN}
            </p>
        </div>

    </Card>
</main>