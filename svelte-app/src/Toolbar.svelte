<script>
    import SelectorDropdownDataset from "./SelectorDropdownDataset.svelte";   
    import NodeGeneratorButton from "./NodeGeneratorButton.svelte";
    import QAButton from "./QAButton.svelte";

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
.toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  justify-content: center;
  font-size: 1.5em;
}

</style>

<div class="toolbar">
    <SelectorDropdownDataset />
    <NodeGeneratorButton bind:query on:click={handleClick} />
    <QAButton />
</div>