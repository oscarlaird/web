<script>
    // Simple wrapper to create a the appropriate node type based on node_type
    import DummyNode from './DummyNode.svelte';
    import DummyNodeRed from './DummyNodeRed.svelte';
    import NodeSmall from './NodeSmall.svelte';

    // real nodes
    import NodeCourse from './NodeCourse.svelte';
    import NodeGame from './NodeGame.svelte';
    import NodeVideo from './NodeVideo.svelte';
    import NodeWord from './NodeWord.svelte';
    import NodeWikipedia from './NodeWikipedia.svelte';
    import NodeProf from './NodeProf.svelte';

    export let fields = {};

    let node;

    // export let dataset;
    // export let query;

    // If word is a field, then it is a NodeWord
    // if video_id is a field, then it is a NodeVideo
    // if developer is a field, then it is a NodeGame
</script>

{#if fields.wordq}
    <NodeWord bind:fields={fields} />
{:else if fields.video_id}
    <NodeVideo bind:fields={fields} />
{:else if fields.research_profile}
    <NodeProf bind:fields={fields} />
{:else if fields.professor}
    <NodeCourse bind:fields={fields} />
{:else if fields.developer}
    <NodeGame bind:fields={fields} />
{:else if fields.content}
    <NodeWikipedia bind:fields={fields} />
{:else}
    <NodeSmall bind:fields={fields} />
{/if}
