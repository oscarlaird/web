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

<span>
<input type="text" bind:value={query} placeholder="Search Vector Database" />
<button on:click={handleClick}>GO</button>
</span>
