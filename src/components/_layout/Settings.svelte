<script lang="ts">
    import Cache from "../../cache.ts";
    import {supabase} from "../../supabase.ts";
    import {onMount} from "svelte";
    import Button from "../_ui/Button.svelte";
    import HelpIcon from "../../icons/HelpIcon.svelte";
    import Session from "../../session.ts";
    import Toast from "../../Toast.ts";
    import SupabaseService from "../../api/supabase-service.ts";
    import Utils from "../../Utils.ts";
    import Card from "../_ui/Card.svelte";


    $: gym = "";
    $: grades = "";
    let isAdmin: boolean = false;
    let gradesPlaceholder = '[\n\t{"value": "1-4b", "grade": "grün"},\n\t{"value": "4a-5b", "grade": "gelb"},\n]'

    /**
     * logout and navigate to login page
     */
    async function logout() {
        const {error} = await supabase.auth.signOut();
        Cache.clearOnLogout();
        Utils.navigateByUrl("/login");
    }

    function setGym(event: any) {
        gym = event.target.value;
    }

    function setGrades(event: any) {
        grades = event.target.value;
    }

    /**
     * add new gym to db
     */
    async function addGymToDb() {
        if (gym === "" || grades === "") {
            new Toast().push({content: Toast.GYM_ADDED_ERROR_MESSAGE, style: 'error', duration: 5000})
            return;
        }
        let newGym = {
            name: gym,
            grades: JSON.parse(grades)
        }
        try {
            await SupabaseService.insertGym(newGym);
            new Toast().push({content: Toast.GYM_ADDED_MESSAGE, style: 'success', duration: 3000})
        } catch (error) {
            new Toast().push({title: Toast.GYM_ADDED_ERROR_MESSAGE, content: error, style: 'error', duration: 5000})
        }
    }

    /**
     * check if user is admin
     */
    onMount(async () => {
        if (import.meta.env.DEV) isAdmin = true;
        else if (await Session.getCurrentUserId() === import.meta.env.PUBLIC_ADMIN_USER) isAdmin = true;
    })

</script>

<main class="mb-20">
    {#if isAdmin}
        <Card title="Neue Halle hinzufügen">
            <div class="admin-panel">
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="gym"
                               class="block mb-2 text-sm text-left font-medium text-custom-silver">Name
                            der Halle</label>
                        <input type="text" name="gym" on:change={e => setGym(e)}
                               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Boulderwelt München Süd" required/>
                    </div>
                    <div>
                        <label for="grades"
                               class="block mb-2 text-sm text-left font-medium text-custom-silver">Schwierigkeitsgrade</label>
                        <textarea
                                name="grades" on:change={e => setGrades(e)}
                                placeholder={gradesPlaceholder}
                                value={gradesPlaceholder}
                                class="h-56 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required/>
                    </div>
                </form>
                <br>
                <Button
                        text="Halle hinzufügen"
                        type="custom-red"
                        onClick={() => addGymToDb()}
                />
            </div>
        </Card>
    {/if}

    <br>

    <Card title="Hilfe" icon={HelpIcon}>
        <div class="text-custom-silver ">
            <p>
                Bei Problemen oder Fragen wende dich bitte direkt an den Entwickler. Du kannst mich per E-Mail unter
                der folgenden Adresse erreichen:
                <b><a href="mailto:kreutzermaik123@web.de"> kreutzermaik123@web.de </a></b>
                Alternativ findest du möglicherweise auch im <b><a
                    href="https://saarclimb-docs.netlify.app/benutzerhandbuch/allgemein/"> Benutzerhandbuch </a></b>
                eine Antwort auf deine Fragen.
            </p>
        </div>
        <br>
        <Button
                text="Ausloggen"
                type="custom-red"
                onClick={() => logout()}
        />
    </Card>
</main>
