<script>
    // Props received by the component
    export let fields = {};

    export let active = false;
    export let hover = false;

    // export let dataset;
    // export let query;

</script>
  
<style>

.node_small {
    width: 270px;
    
	filter: drop-shadow(20px);
	border-radius: 10px;
    border: 1px solid black;

    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    transition: .1s;

    background-color: #f4f4f4;

    position: relative;
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

p {
    margin: 0;
    padding: 0;
    max-height: 150px;
    overflow-y: auto;
    text-align: left;
}
img {
    max-width: 60%;
    /* preserve the aspect ratio and crop the height to the middle 50% */
    max-height: 150px;
    object-fit: cover;
    /* keep the top of the image */
    object-position: top;
}
h2 {
    text-align: left;
    margin: 0px;
    padding: 0px;
    font-size: 1em;
    font-weight: bold;
    color: black;
}
h3 {
    text-align: left;
    margin: 0px;
    padding: 0px;
    font-size: 0.7em;
    font-weight: bold;
    color: black;
    /* italicize */
    font-style: italic;
}
.logo {
    /* lazy loading height/width=50 */
    max-width: 50px;
    max-height: 50px;
    object-fit: cover;
    object-position: center;
    loading: lazy;
    background-color: white;
    border: 1px solid black;
}
.logo-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* absolutely positioned in the upper left corner */
    position: absolute;
    bottom: 0;
    right: 0;
}
    
</style>

<button class="node_small" 
    class:active={active} class:hover={hover}  
    on:click={() => {active = !active}} 
    on:mouseover={() => {hover = !hover}}
    on:focus={() => {hover = !hover}}
    on:mouseout={() => {hover = !hover}}
    on:blur={() => {hover = !hover}}>
    <!-- title -->
    <img src={fields.img_src} width="460px" height="215px" loading="lazy">
    <h2>{fields.name}</h2>
    <!-- content -->
    <p>{fields.research_profile}</p>
</button>
