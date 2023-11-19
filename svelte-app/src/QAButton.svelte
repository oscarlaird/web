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

<style>
.qa_button {
    border-radius: 10px;
    color: var(--primary);
    background-color: var(--tertiary);
    border: 0px;
    margin-left: 5px;
}
</style>

<span>

<input type="text" bind:value={question} placeholder="Ask a Question..." />
<button class="qa_button" on:click={handleAsk}>ASK</button>
</span>
