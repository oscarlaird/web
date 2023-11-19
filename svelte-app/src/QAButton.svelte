<script>
    export let query;
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
<input type="text" bind:value={query} placeholder="Ask a Question..." />
<button class="qa_button">ASK</button>
</span>
