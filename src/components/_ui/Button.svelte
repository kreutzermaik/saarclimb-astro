<script lang="ts">
    export let text: string;
    export let type: string;
    export let outline: string = "undefined";
    export let rounded: string = "undefined";
    export let width: string = "undefined";
    export let opacity: string = "undefined";
    export let textSize: string = "undefined";
    export let paddingX: string = "undefined";
    export let disabled: boolean = false;
    export let icon: any | null = null;
    export let onClick: Function = () => {};

    function handleClick() {
        onClick();
    }
</script>

<button
        on:click={handleClick}
        type="button"
        disabled={disabled === true}
        class={`bg-secondary ${width} ${opacity} ${paddingX} ${
    textSize
  } ${(outline === "true") ? "btn-outline border" : ""} ${
    (rounded === "true") ? "rounded-full" : "rounded-lg"
  } text-white text-sm focus:ring-4 font-medium px-5 py-2 mr-2 mb-2 focus:outline-none`}
>
    {#if icon !== null}
        <div><svelte:component this={icon}/></div>
    {/if}
    {text}
</button>
