<script>
    import NodeSmall from "./NodeSmall.svelte";

    let nodes = [];

    // Props received by the component
    //export let data = {};
  
    // Reactive statement to get keys and values from the fields object

    function addNodeComponents() {
        const parentElement = document.getElementById('node-container');
        for (let i = 0; i < 2; i++) {
            const nodeComponent = new NodeSmall({ target: parentElement });
            nodeCount++;
            nodes.push(nodeComponent);
        }
    }


</script>

<button on:click={addNodeComponents}>GO</button>