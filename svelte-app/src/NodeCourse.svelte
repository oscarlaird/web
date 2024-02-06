<script>
    // Props received by the component
    export let fields = {};

    export let active = false;
    export let hover = false;

    // export let dataset;
    // export let query;

    async function get_professor(name) {
        // async call to get_professor by name
        console.log("name", name);
        let res = await fetch(`http://localhost:5006/get_professor?name=${name}`);
        let prof = await res.json();
        console.log("prof", prof);
        return prof;
    }

    async function handle_prof_click() {
        // async call to get_professor by name
        let prof = await get_professor(fields.professor);
        // update query to prof.research_profile
        query = prof.research_profile;
        console.log("query", query);
        // set dataset to 'professors'
        dataset = 'professors';
    }

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
    max-width: 100%;
    /* preserve the aspect ratio and crop the height to the middle 50% */
    max-height: 100px;
    object-fit: cover;
    object-position: center;
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
    class:hover={hover}  
    on:mouseover={() => {hover = !hover}}
    on:focus={() => {hover = !hover}}
    on:mouseout={() => {hover = !hover}}
    on:blur={() => {hover = !hover}}>
    <!-- title -->
    <img src={`http://localhost:5005/image/${fields.img_url}`} width="460px" height="215px" loading="lazy">
    <h2>CS {fields.number} {fields.title}</h2>
    {#if fields.professor && fields.professor != '' && fields.professor != 'unknown' && fields.professor != 'Unknown'}
        <a on:click={handle_prof_click} href="javascript:void(0);"><h3>{fields.professor}</h3></a>
    {/if}
    <!-- content -->
    <p>{fields.description}</p>
    <!-- programming language logo images -->
    <!-- if 'python' in languages string https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/community/logos/python-logo-only.png -->
    {#if fields.languages && fields.languages != '' && fields.languages != 'unknown' && fields.languages != 'Unknown'}
    <div class="logo-box">
        {#if fields.languages.includes('python') || fields.languages.includes('Python')}
            <img class="logo" src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/community/logos/python-logo-only.png" alt="Python Logo" >
        {/if}
        {#if fields.languages.includes('C')}
            <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png" alt="C++ Logo" >
        {/if}
        {#if fields.languages.includes('Java')}
            <img class="logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png" alt="Java Logo" >
        {/if}
        {#if fields.languages.includes('JavaScript')}
            <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" alt="JavaScript Logo" >
        {/if}
        {#if fields.languages.includes('PyTorch')}
            <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/PyTorch_logo_icon.svg/992px-PyTorch_logo_icon.svg.png?20200318225611" alt="PyTorch Logo" >
        {/if}
    </div>
    {/if}
</button>
