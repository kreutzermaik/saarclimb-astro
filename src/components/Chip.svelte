<script lang="ts">
    export let text: string | undefined = "";
    export var className: string = "";
</script>

<div class={`chip ${className}`}>
    {text}
</div>

<style>
    .chip {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7.5em;
        height: 3em;
        padding: 0.5em;
        margin-bottom: 1em;
        border-radius: 15px;
    }
</style>