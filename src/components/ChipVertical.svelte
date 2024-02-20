<script lang="ts">
    export let content: string;
    export let onClick: Function = () => {};
</script>

<button class={`chip-vertical ${content !== "" ? 'cursor-pointer' : ''}`} on:click={() => onClick()}>
    {#if content !== ""}
        <hr class="border-2 border-accent w-full mx-1">
    {/if}
</button>


<style>
    .chip-vertical {
        display: flex;
        align-items: center;
        width: 30px;
        height: 60px;
        border-radius: 25px 25px 25px 25px;
        background-color: theme('colors.primary');
        color: theme('colors.light');
        margin-top: 0.5em;
    }
</style>