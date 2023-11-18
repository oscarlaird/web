<script>
    import { new_neighbors, positions } from "./position.js";
    import DynamicNode from "./DynamicNode.svelte";
    // We receive nodes, node_positions, and positions
    // export let docs = [{title: "doc1", content: "content1"}, {title: "doc2", content: "content2"}, {title: "doc3", content: "content3"}, {title: "doc4", content: "content4"}];
    export let selected_node_id = 1; // id of the center/selected node

    export let nodes;
    export let node_positions;
    export let centerX = 400;
    export let centerY = 300;

    $: position_lookup = nodes.map(node => {
        if (node.id === selected_node_id) return {rel_x: 0, rel_y: 0};
        return positions.find(pos => pos.pos_id === node_positions.find(np => np.node_id === node.id).pos_id);
    });

    // lines
    $: lines = nodes.map((node, idx) => {
        if (node.id === selected_node_id) return null;
        return {
            x1: centerX,
            y1: centerY,
            x2: centerX + position_lookup[idx].rel_x,
            y2: centerY + position_lookup[idx].rel_y
        }
    }).filter(line => line !== null);


    // handle node click
    function handleNodeClick(node_id) {
        // update nodes and node_positions 
        let new_ctr_pos_id = node_positions.find(np => np.node_id === node_id).pos_id;
        let new_ctr_pos = positions.find(pos => pos.pos_id === new_ctr_pos_id);
        centerX += new_ctr_pos.rel_x;
        centerY += new_ctr_pos.rel_y;
        ({ nodes, node_positions } = new_neighbors("dummy_query", nodes, node_positions, selected_node_id, node_id));
        selected_node_id = node_id;
    }

    // container element
    let containerElement;
</script>


{JSON.stringify(positions)}
<!-- Nodes -->
<div class="container" bind:this={containerElement}>
{#each nodes as node, idx (node.id)}
    <div on:click={() => handleNodeClick(node.id)} on:keydown={() => handleNodeClick(node.id)}
        class="node" style="left: {centerX + position_lookup[idx].rel_x}px; top: {centerY + position_lookup[idx].rel_y}px;">
        <DynamicNode fields={node} />
    <!-- Include content like text or embedded videos -->
    </div>
{/each}
<!-- Connecting Lines -->
<svg class="overlay" style="width: 100%; height: 100%;">
    {#each lines as line}
        <line x1={line.x1 + 'px'} y1={line.y1 + 'px'} 
                x2={line.x2 + 'px'} y2={line.y2 + 'px'} 
                stroke="black" />
    {/each}
</svg>
</div>

<style>
.container {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    position: relative;
}
.node {
    position: absolute;
    min-width: 150px;
    min-height: 100px;
    border: 1px solid black;
    padding: 10px;
    background: white;
    transition: left 0.5s, top 0.5s; /* Adjust the duration as needed */
}
.overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
