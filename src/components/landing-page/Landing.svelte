<script lang="ts">
    import {DeviceMockup} from 'flowbite-svelte';
    import {Button} from "flowbite-svelte";
    import Utils from "../../Utils.ts";
</script>


<div>
    <h1 class="text-4xl font-bold p-8 text-center">
        🧗 Die SaarClimb App 💪🏼
    </h1>
    <h2 class="text-xl font-medium text-center mx-8">
        Die <strong>Boulder-App</strong> für Sportler aus dem <strong>Saarland</strong> und Umgebung!
    </h2>

    <br>

    <div class="flex flex-wrap justify-center gap-10 lg:gap-20 mt-0 lg:mt-8 mx-auto max-w-[80vw] lg:max-w-[70vw]">
        <div>
            <DeviceMockup>
                <img src="/mockups/fortschritt.png" class="dark:hidden w-[272px] h-[572px]"
                     alt="Tracke deinen Fortschritt"/>
            </DeviceMockup>
        </div>
        <div class="max-w-xl p-4">
            <h3 class="text-2xl font-bold mb-4">
                📈 Tracke deinen Fortschritt
            </h3>
            <p class="text-lg font-medium">
                Wähle eine Boulderhalle aus und trage deine Begehungen ein. So kannst du deinen Fortschritt verfolgen
                und dich mit anderen Sportlern messen.
            </p>

            <br><br>

            <h3 class="text-2xl font-bold mb-4">
                📅 Plane deine Workouts
            </h3>
            <p class="text-lg font-medium">
                Plane deine individuelle Trainingswoche und behalte den Überblick über deine Trainingszeiten.
            </p>

            <br><br>

            <h3 class="text-2xl font-bold mb-4">
                🏆 Vergleiche dich mit Freunden
            </h3>
            <p class="text-lg font-medium">
                In der Bestenliste kannst du deinen berechneten Score aller absolvierten Boulder vergleichen und dich
                mit Freunden messen.
            </p>

            <div class="mt-12">
                <Button class="w-full" color="purple" on:click={() => Utils.navigateByUrl("register")}>Jetzt loslegen</Button>
            </div>
            <div class="h-12 lg:h-[28vh]"></div>
        </div>
    </div>
</div>