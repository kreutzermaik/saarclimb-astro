<script lang="ts">
    export let title: string | null = null;
    export let icon: any | null = null;
    export let iconLink: any | null = null;
</script>

<div class="bg-light-grey text-light p-6 rounded-2xl">
    <div class="flex justify-between">
        {#if title !== null}
            <div><h2 class="text-xl font-bold mb-4">{title}</h2></div>
        {/if}
        {#if icon !== null}
            {#if iconLink !== null}
                <a href={iconLink}>
                    <svelte:component this={icon}/>
                </a>
            {:else}
                <div>
                    <svelte:component this={icon}/>
                </div>
            {/if}
        {/if}
    </div>
    <div class="mt-4">
        <slot></slot>
    </div>
</div>