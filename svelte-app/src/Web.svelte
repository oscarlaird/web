<script>
    import { new_neighbors, positions } from "./position.js";
    import { fade } from "svelte/transition";
    import { cubicOut, cubicIn } from "svelte/easing";
    import DynamicNode from "./DynamicNode.svelte";
    // We receive nodes, node_positions, and positions
    // export let docs = [{title: "doc1", content: "content1"}, {title: "doc2", content: "content2"}, {title: "doc3", content: "content3"}, {title: "doc4", content: "content4"}];
    export let selected_node_id = 1; // id of the center/selected node

    export let nodes;
    export let node_positions;
    export let centerX = 1300;
    export let centerY = 550;

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
            y2: centerY + position_lookup[idx].rel_y,
            stroke_width: node_positions.find(np => np.node_id === node.id).pos_id
        }
    }).filter(line => line !== null);


    // handle node click
    async function handleNodeClick(node_id) {
        if (node_id === selected_node_id) return;
        // update nodes and node_positions 
        let new_ctr_pos_id = node_positions.find(np => np.node_id === node_id).pos_id;
        let new_ctr_pos = positions.find(pos => pos.pos_id === new_ctr_pos_id);
        ({ nodes, node_positions } = await new_neighbors("dummy_query", nodes, node_positions, selected_node_id, node_id));
        // centerX += new_ctr_pos.rel_x;
        // centerY += new_ctr_pos.rel_y;
        selected_node_id = node_id;
    }

    // container element
    let containerElement;


</script>


<!-- Nodes -->
<div class="container" bind:this={containerElement}
>
{#each nodes as node, idx (node.id)}
    <div on:click={() => handleNodeClick(node.id)} on:keydown={() => handleNodeClick(node.id)}
        in:fade={{duration: 0, delay: 1000, easing: cubicIn}} out:fade={{duration: 300, delay: 0, easing: cubicOut}}
        class="node" style="left: {centerX + position_lookup[idx].rel_x}px; top: {centerY + position_lookup[idx].rel_y}px;">
        <DynamicNode fields={node} />
    <!-- Include content like text or embedded videos -->
    </div>
{/each}
<!-- Connecting Lines -->
{#key selected_node_id}
<svg class="overlay" style="width: 100%; height: 100%;" in:fade={{duration: 0, delay: 1000, easing: cubicIn}} out:fade={{duration: 300, delay: 0, easing: cubicOut}}>
    {#each lines as line}
        <line x1={line.x1 + 'px'} y1={line.y1 + 'px'} 
                x2={line.x2 + 'px'} y2={line.y2 + 'px'} 
                stroke="black" stroke-width={11 - line.stroke_width} />
    {/each}
</svg>
{/key}
</div>

<style>
.container {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    user-select: none;
    cursor: grab;
}
.node {
    position: absolute;
    transition: left 1.0s, top 1.0s; /* Adjust the duration as needed */
    transition-delay: 0ms;
    transform: translate(-50%, -50%);
    z-index: 1;
}
.overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }
</style>
