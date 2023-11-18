<script>
    // Props received by the component
    export let fields = {};

    export let isSelected = false;

    export let id;
    export let x;
    export let y;
    export let width;
    export let height;

    const getCenterCoordinates = () => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return { centerX, centerY };
    };

  
    // Reactive statement to get keys and values from the fields object
    $: entries = Object.entries(fields);

    export let active = false;


  </script>
  
<style>
.node_small {
    
    padding: 10px;
    margin: 10px;
    max-width: 200px;
    height:200px;
    
	filter: drop-shadow(20px);
	border-radius: 20px;

    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    transition: .1s;
}

.active {
    width: 250px;
    border: 5px solid black;
    /*background: tomato;	*/
    border-color: tomato;
    transition: .1s;
}

</style>

<button class:active={active} class="node_small" on:click={() => {active = !active}}>
    {#each entries as [key, value]}
        <div>
        <strong>{key}:</strong> {value}
        </div>
    {/each}
    :id={id}
    x={x}
    y={y}
    width={width}
    height={height}

</button>


