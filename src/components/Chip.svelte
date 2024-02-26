<script lang="ts">
    export let text = "";
    export let background = "";
</script>

<div class={`chip bg-custom-${background}`}>
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