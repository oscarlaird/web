<script>
    import NodeGeneratorButton from "./NodeGeneratorButton.svelte";
    import SelectorDropdownDataset from "./SelectorDropdownDataset.svelte";   
    import SelectorDropdownFunction from "./SelectorDropdownFunction.svelte";

    export let query;

    const handleDatasetChange = (event) => {
        const selectedOption = event.target.value;
        const options = document.querySelectorAll('#dataset-selector option');

        for (const option of options) {
            option.style.backgroundColor = 'none';
        }

        document.querySelector('#dataset-selector option[value="${selectedOption}"]').style.backgroundColor = 'red';
    };
</script>

<style>
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;

  border-radius: 10px;
  /*background-color: #f1f1f1;*/

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

}

.toolbar label {
  font-weight: bold;
}

#dataset-selector {
  padding: 5px;
  border: 1px solid #ccc;
}
</style>

<div class="toolbar">
    <!--
    <label for="dataset-selector">Dataset:</label>
    <select id="dataset-selector" on:change={handleDatasetChange}>
        <option value="research">Research</option>
        <option value="wikipedia">Wikipedia</option>
        <option value="videos">Videos</option>
    </select>
    -->
    <SelectorDropdownDataset />
    <SelectorDropdownFunction />
    <NodeGeneratorButton />
</div>
<input type="text" placeholder="Search your vector database" bind:value={query} />
<div id="node-container"></div>