<script>
	import Select from 'svelte-select';
		
	const datasetItems = [
		{value: 'find', label: 'Find'},
        {value: 'compare', label: 'Compare'},
        {value: 'reference', label: 'Reference'}
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

    .centered {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    input {
        border-radius: 10px;
    }
</style>


<div class="centered">
    <div class="selector_div">
        <h2>Function:</h2>
        <Select items={datasetItems} --border-radius="10px" ></Select>
    </div>
    <input type="text" placeholder="Enter prompt"/>
</div>