<script>
    // Simple wrapper to create a the appropriate node type based on node_type
    import DummyNode from './DummyNode.svelte';
    import DummyNodeRed from './DummyNodeRed.svelte';
    import NodeSmall from './NodeSmall.svelte';

    export let fields = {};
    $: node_type = fields['node_type']

    let node;
</script>

{#if node_type === 'dummy-red'}
    <DummyNodeRed fields={fields} bind:this={node} />
{:else}
    <NodeSmall fields={fields} bind:this={node} />
{/if}

