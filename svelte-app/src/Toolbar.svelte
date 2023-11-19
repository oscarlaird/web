<script>
    import SelectorDropdownDataset from "./SelectorDropdownDataset.svelte";   
    import NodeGeneratorButton from "./NodeGeneratorButton.svelte";
    import QAButton from "./QAButton.svelte";

    export let query;
    export let question;
    export let dataset;
    export let answer;

    /* send event on button press */
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function handleClick() {
        dispatch('click', {
            query: query
        });
    }
    function handleAsk() {
        dispatch('ask', {
            question: question
        });
    }

</script>

<style>
.toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  justify-content: center;
  font-size: 1.5em;
}
.answer_box {
    width: 380px;
    height: 600px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    border: 0px;
    border-radius: 10px;
    padding: 10px;
    background: var(--background);
    overflow-y: auto;
    
}

.answer_box p {
    font-size: medium;
}

</style>

<div class="toolbar">
    <SelectorDropdownDataset bind:dataset />
    <NodeGeneratorButton bind:query on:click={handleClick} />
    <QAButton bind:question on:ask={handleAsk} />
    <div class="answer_box">
        <p>{answer}</p>
    </div>
</div>