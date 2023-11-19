<script>
    // Props received by the component
    export let fields = {};
    // display a youtube video given the start_time, transcript, and src_url
    // Construct the YouTube URL with timestamp
    $: youtubeUrl = `https://www.youtube.com/embed/${fields.video_id}?start=${fields.start_time}`;

    export let active = false;
    export let hover = false;
</script>
  
<style>

.node_small {
    padding: 10px;
    margin: 10px;
    width: 250px;
    min-width: 450px;
    
	filter: drop-shadow(20px);
	border-radius: 20px;
    border: 5px solid black;
    border-color: #f4f4f4;

    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    background-color: #f4f4f4;

    transition: .1s;

    scale: 0.5;
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

<button class="node_small" class:active={active} class:hover={hover}  
on:click={() => {active = !active}} 
on:mouseover={() => {hover = !hover}}
on:focus={() => {hover = !hover}}
on:mouseout={() => {hover = !hover}}
on:blur={() => {hover = !hover}}>

<!-- YouTube Video Embed -->
{#if fields.video_id && fields.start_time}
    <iframe
        title="YouTube video player"
        width="400"
        height="300"
        src={youtubeUrl}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
    <p>{fields.transcript}</p>
{/if}

</button>