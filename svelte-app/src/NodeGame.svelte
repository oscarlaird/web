<script>
    // Props received by the component
    import { Accordion, AccordionItem } from 'svelte-collapsible'
    import { prevent_default } from 'svelte/internal';


    export let fields = {};

    //export let isSelected = false;

    // Reactive statement to get keys and values from the fields object
    $: entries = Object.entries(fields);

    export let active = false;
    export let hover = false;

    export let nodeType = 'Small';

    let showParagraph = false;

    function expandDetails() {
        showParagraph = true;
    }

    function hideDetails() {
        showParagraph = false;
    }

    /*
    function expandDetails() = {
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Hello, world!';
        return paragraph;

    }
    */


  </script>
  
<style>

.node_large {
    padding: 10px;
    margin: 10px;
    width: 500px;
    
	filter: drop-shadow(20px);
	border-radius: 20px;
    border-color: #f4f4f4;


    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    transition: .1s;
}

.node_small {
    padding: 10px;
    margin: 10px;
    width: 250px;
    
	filter: drop-shadow(20px);
	border-radius: 20px;
    border: 5px solid var(--secondary);
    border-color: #f4f4f4;

    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    transition: .1s;
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

.expanded {

}

button img {
    border-radius: 20px;
    border: 5px solid black;
    border-color: var(--tertiary);
}

</style>

{#if nodeType == 'Large'}
<button class:active={active} class="node_large" on:click={() => {active = !active}}>

    <!-- Large Node -->
    <h2>{fields.name}</h2>                                        <!-- Name -->
    <img src={fields.img_url} width="460px" height="215px" loading="lazy">          <!-- Image -->
    <p>Developer: {fields.developer}</p>                               <!-- Developer -->
    <p>Release Date: {fields.date}</p>                            <!-- Release Date -->
    <p>{fields.full_desc}</p>                                          <!-- About -->
    <p>{fields.price}</p>                                          <!-- Price -->
    <a href="{fields.url_info}" target="_blank">{entries[6][1]}</a>   <!-- Steam Link -->
</button>
{/if}

{#if nodeType == 'Small'}
<button class:active={active} class:hover={hover} class="node_small" 
    on:contextmenu={prevent_default(() => {active = !active, fields.active = !fields.active})}
    on:mouseover={() => {hover = !hover, expandDetails}}
    on:focus={() => {hover = !hover}}
    on:mouseout={() => {hover = !hover, hideDetails}}
    on:blur={() => {hover = !hover}}>
    <!-- Small Node -->
    <a href="{fields.url_info}"><h2>{fields.name}</h2></a>                                     <!-- Name -->
    <img src={fields.img_url} width="172px" height="80px">          <!-- Image -->
    <p>{fields.developer}</p>                               <!-- Developer -->
    <p>Release Date: {fields.date}</p>                            <!-- Release Date -->

    
    <!--
    <div on:mouseover={expanddetails} on:mouseout={hideDetails}>
        <p>{showParagraph ? 'Hovering over box!' : ''}</p>
    </div>
-->
      
    
</button>
{/if}

    <!--
    <p>{entries[0]}</p>
   
    {#each entries as [key, value]}
        <div>
        <strong>{key}:</strong> {value}
        </div>
    {/each}
    -->
    
    <!--
    <Accordion>
        <AccordionItem>
            <div slot='header' class='header'>
                <div>
                    <h2>Details</h2>
                </div>
            </div>
            <div slot='body' class='body'>
                {#each entries as [key, value]}
                    <h2>{ key }</h2>
                    <p> {value} </p>
                { /each }
            </div>
        </AccordionItem>
    </Accordion>
-->


