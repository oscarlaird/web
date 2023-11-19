<script>
    // Props received by the component
    export let fields = {};

    export let active = false;
    export let hover = false;

</script>
  
<style>

.node_small {
    padding: 10px;
    margin: 10px;
    width: 250px;
    
	filter: drop-shadow(20px);
	border-radius: 20px;
    border: 5px solid black;
    border-color: #f4f4f4;

    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    transition: .1s;

    background-color: #f4f4f4;
}

.active {
    border: 5px solid black;
    border-color: var(--tertiary);
    transition: .1s;
}

.hover {
    border: 5px solid black;
    border-color: var(--tertiary);
    transition: .1s;
}

</style>

<button class="node_small" 
    class:active={active} class:hover={hover}  
    on:click={() => {active = !active}} 
    on:mouseover={() => {hover = !hover}}
    on:focus={() => {hover = !hover}}
    on:mouseout={() => {hover = !hover}}
    on:blur={() => {hover = !hover}}>
    <h2>{fields.word}</h2>
</button>