<script lang="ts">
    import Button from "./Button.svelte";
    import Utils from "../Utils.ts";
    import Card from "./Card.svelte";
    import InfoIcon from "../icons/InfoIcon.svelte";
</script>

<main class="text-custom-silver">

    <Card title="Bitte einloggen" icon={InfoIcon}>
        <p>Für diese Seite musst du eingeloggt sein!</p>
        <br>
        <Button text="Zum Login" type="secondary" onClick={() => Utils.navigateByUrl("/login")}/>
    </Card>

</main>
