<script lang="ts">
    export let title: string;
</script>

<div class="bg-light-grey text-light p-6 rounded-2xl">
    <h2 class="text-xl">{title}</h2>
    <div class="mt-4">
        <slot></slot>
    </div>
</div>