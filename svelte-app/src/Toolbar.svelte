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
    width: 400px;
    height: 100px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    background: var(--background);
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