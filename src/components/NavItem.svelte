<script lang="ts">
    import DashboardIcon from "../icons/DashboardIcon.svelte";
    import ProgressIcon from "../icons/ProgressIcon.svelte";
    import PlanerIcon from "../icons/PlanerIcon.svelte";
    import RankingIcon from "../icons/RankingIcon.svelte";

    export let text: string;
</script>

<button class={`flex items-center justify-center flex-col cursor-pointer p-4 text-light`}>
    <a href={`/${text.toLowerCase()}`}>
        {#if text === "Dashboard"}
            <DashboardIcon/>
        {:else if text === "Fortschritt"}
            <ProgressIcon />
        {:else if text === "Planer"}
            <PlanerIcon />
        {:else if text === "Ranking"}
            <RankingIcon />
        {/if}
        <p class={`inActiveTabColor}`}>{text}</p>
    </a>
</button>