<script lang="ts">
    import SettingsIcon from "../../icons/SettingsIcon.svelte";
    import AvatarIcon from "../../icons/AvatarIcon.svelte";

    export let title: string;
    let avatar: any;

</script>

<main class="bg-dark-grey mb-6">
    <div class="p-4 rounded-lg flex justify-between">
            <div class="text-light w-6 h-6">
                <AvatarIcon />
            </div>

        <h1 class="text-light text-xl uppercase mx-auto">{title}</h1>

        <a href="/settings">
            <div class="text-light w-6 h-6">
                <SettingsIcon />
            </div>
        </a>
    </div>
</main>
