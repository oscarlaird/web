<script>
    export let question;
    /* send event on button press */
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function handleAsk() {
        dispatch('ask', {
            question: question
        });
    }
</script>

<span>
<input type="text" bind:value={question} placeholder="Ask a Question..." />
<button on:click={handleAsk}>ASK</button>
</span>
