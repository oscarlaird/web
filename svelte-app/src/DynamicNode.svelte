<script>
    // Simple wrapper to create a the appropriate node type based on node_type
    import DummyNode from './DummyNode.svelte';
    import DummyNodeRed from './DummyNodeRed.svelte';

    export let fields = {};
    $: node_type = fields['node_type']

    let node;
</script>

{#if node_type === 'dummy'}
    <DummyNode fields={fields} bind:this={node} />
{:else if node_type === 'dummy-red'}
    <DummyNodeRed fields={fields} bind:this={node} />
{/if}

