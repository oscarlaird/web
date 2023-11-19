<script>
    export let query;
    /* send event on button press */
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function handleClick() {
        dispatch('click', {
            query: query
        });
    }
</script>

<style>
    .go_button {
        border-radius: 10px;
        color: var(--primary);
        background-color: var(--tertiary);
        border: 0px;
        margin-left: 5px;
    }
</style>

<span>
<input type="text" bind:value={query} placeholder="Search Vector Database" />
<button class="go_button" on:click={handleClick}>GO</button>
</span>
