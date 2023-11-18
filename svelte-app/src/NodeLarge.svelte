<script>
    // Props received by the component
    import { Accordion, AccordionItem } from 'svelte-collapsible'


    export let fields = {};

    export let isSelected = false;

    export let id;
    export let x;
    export let y;
    export let width;
    export let height;

    const getCenterCoordinates = () => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return { centerX, centerY };
    };

  
    // Reactive statement to get keys and values from the fields object
    $: entries = Object.entries(fields);

    export let active = false;


    const items = [
		{
			key: 'a',
			img: 'https://picsum.photos/100?random=1',
			title: 'untoward',
			subtitle: 'Details',
			text: 'Oh wow, look at these details.'
		},
		{
			key: 'b',
			img: 'https://picsum.photos/100?random=2',
			title: 'trill',
			subtitle: 'a quavering or vibratory sound, especially a rapid alternation of sung or played notes.',
			text: 'Many languages include a trill in their pronunciation, the sound of a consonant spoken while the tongue vibrates in a very specific way against the teeth or roof of the mouth. To pronounce this sound is also to trill. The word originally referred to a vibrating or warbling sound made by a singer, from the Italian word trillio, "a quavering or warbling," and its also often used to describe the sound a bird makes.'
		},
		{
			key: 'c',
			img: 'https://picsum.photos/100?random=3',
			title: 'chinwag',
			subtitle: 'a long and pleasant conversation between friends',
			text: 'The journalist, who seems oddly unalarmed by the frequent reports of murders, loves a good chin-wag and keeps trying to chum up to Tshembe, who wants none of him.'
		}
	]


  </script>
  
<style>
.node_large {
    
    padding: 10px;
    margin: 10px;
    width: 500px;
    height:500px;
    
	filter: drop-shadow(20px);
	border-radius: 20px;

    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    transition: .1s;
}

.active {
    max-width: 500px;
    max-height: 500px;
    border: 5px solid black;
    /*background: tomato;	*/
    border-color: tomato;
    transition: .1s;
}

</style>

<button class:active={active} class="node_large" on:click={() => {active = !active}}>
    {#each entries as [key, value]}
        <div>
        <strong>{key}:</strong> {value}
        </div>
    {/each}
    :id={id}
    x={x}
    y={y}
    width={width}
    height={height}

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

</button>


