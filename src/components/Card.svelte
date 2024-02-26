<script lang="ts">
    export let title: string | null = null;
    export let icon: any | null = null;
</script>

<div class="bg-light-grey text-light p-6 rounded-2xl">
    <div class="flex justify-between">
        {#if title !== null}
            <div><h2 class="text-xl font-bold mb-4">{title}</h2></div>
        {/if}
        {#if icon !== null}
            <div><svelte:component this={icon}/></div>
        {/if}
    </div>
    <div class="mt-4">
        <slot></slot>
    </div>
</div>