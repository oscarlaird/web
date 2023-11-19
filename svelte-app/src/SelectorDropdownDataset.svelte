<script>
	import Select from 'svelte-select';
    export let dataset;
		
	const datasetItems = [
		{value: 'research', label: 'Research'},
        {value: 'wikipedia', label: 'Wikipedia'},
        {value: 'games', label: 'Games'},
        {value: 'words', label: 'Words'},
        {value: 'videos', label: 'Videos'},
	];
	
	const groupBy = (item) => item.group;
	const itemId = 'id';
    const getOptionLabel = (option) => option.name;
</script>

<style>
    .selector_div {
        width: 400px;
        height: 100px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>


<div class="selector_div">
    <Select items={datasetItems} --border-radius="10px" placeholder="Select a dataset" bind:value={dataset} ></Select>
</div>