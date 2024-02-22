<script lang="ts">
    export let title: string | null = null;
</script>

<div class="bg-light-grey text-light p-6 rounded-2xl">
    {#if title !== null}
        <h2 class="text-xl font-bold mb-4">{title}</h2>
    {/if}
    <div class="mt-4">
        <slot></slot>
    </div>
</div>