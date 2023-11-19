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
    export let centerX = 1000;
    export let centerY = 500;

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


    // panning
  let isDragging = false;
  let startX, startY;
  let scrollLeft, scrollTop;
  let orig_centerX, orig_centerY;

  function onMousedown(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    scrollLeft = event.target.scrollLeft;
    scrollTop = event.target.scrollTop;
    orig_centerX = centerX;
    orig_centerY = centerY;
    
    // Prevent default to avoid selecting text while dragging
    event.preventDefault();
  }

  function onMousemove(event) {
    if (!isDragging) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    event.target.scrollLeft = scrollLeft - dx;
    event.target.scrollTop = scrollTop - dy;
    
    centerX = orig_centerX + dx;
    centerY = orig_centerY + dy;
  }

  function onMouseup() {
    isDragging = false;
  }
</script>


<!-- Nodes -->
<div class="container" bind:this={containerElement}
  on:mousedown={onMousedown}
  on:mousemove={onMousemove}
  on:mouseup={onMouseup}
  on:mouseleave={onMouseup}  
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
                stroke="black" />
    {/each}
</svg>
{/key}
</div>

<style>
.container {
    height: 100vh;
    width: 100vw;
    overflow: auto;
    position: relative;
    user-select: none;
    cursor: grab;
}
.node {
    position: absolute;
    min-width: 150px;
    min-height: 100px;
    border: 1px solid black;
    padding: 10px;
    background: white;
    transition: left 1.0s, top 1.0s; /* Adjust the duration as needed */
    transition-delay: 0ms;
    transform: translate(-50%, -50%);
}
.overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
