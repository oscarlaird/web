<script>
    export let docs = [{title: "doc1", content: "content1"}, {title: "doc2", content: "content2"}, {title: "doc3", content: "content3"}, {title: "doc4", content: "content4"}];
    export let selected_idx = 2;
    export let xys = [{x: 0, y: 0}, {x: 40, y: 40}, {x: 60, y: 10}, {x: 110, y: 110}];

    // merge
    let nodes = docs.map((doc, idx) => ({...doc, ...xys[idx]}));

    // lines
    $: lines = nodes.map((node, idx) => {
        if (idx === selected_idx) return null;
        return {
            x1: nodes[selected_idx].x,
            y1: nodes[selected_idx].y,
            x2: node.x,
            y2: node.y
        }
    }).filter(line => line !== null);
</script>


<!-- Nodes -->
<div class="container">
{#each nodes as node}
    <div class="node" style="left: {node.x}vw; top: {node.y}vh;">
    {node.content}
    <!-- Include content like text or embedded videos -->
    </div>
{/each}
<!-- Connecting Lines -->
<svg class="overlay" style="width: 100%; height: 100%;">
    {#each lines as line}
        <line x1={line.x1 + 'vw'} y1={line.y1 + 'vh'} 
                x2={line.x2 + 'vw'} y2={line.y2 + 'vh'} 
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
}
.overlay {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
