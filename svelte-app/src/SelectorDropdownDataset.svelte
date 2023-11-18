<script>
	import Select from 'svelte-select';
		
	const datasetItems = [
		{value: 'research', label: 'Research'},
        {value: 'wikipedia', label: 'Wikipedia'},
	];
	
	const groupBy = (item) => item.group;
	const itemId = 'id';
    const getOptionLabel = (option) => option.name;
</script>

<style>
    .selector_div {
        width: 300px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>


<div class="selector_div">
    <h2>Dataset:</h2>
    <Select items={datasetItems} --border-radius="10px"></Select>
</div>