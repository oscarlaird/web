<script>
	import { init_position_nodes } from "./position.js";
	import DummyNode from './DummyNode.svelte';
    import NodeSmall from './NodeSmall.svelte';
	import ConnectingLine from './ConnectingLine.svelte';
    import Toolbar from './Toolbar.svelte';
    //import OpenAiPrompter from './OpenAIPrompter.svelte';
	import DynamicNode from "./DynamicNode.svelte";
	import Web from "./Web.svelte";
  
	let data = {
	  Name: 'John Doe',
	  Age: 30,
	  Occupation: 'Engineer',
	  node_type: 'dummy-red'
	};

	//Leftover code fragment trying to draw svg line
	const getRectangleCenterCoordinates = (id) => {
		const rect = document.getElementById(id);
		if (rect) {
			return rect.getBoundingClientRect();
		}
		return null;
  	};

	let { nodes, node_positions } = init_position_nodes(data);

</script>
  
<DummyNode fields={data} />
<NodeSmall fields={data} id={'rectangle1'} class='node_small' x={100} y={100} width={100} height={100}/>
<NodeSmall fields={data} id={'rectangle2'} x={300} y={300} width={200} height={200}/>
<Toolbar />


<!--
{#if data}
<ConnectingLine
  :rectangle1CenterX={getRectangleCenterCoordinates('rectangle1').left + 100 / 2}
  :rectangle1CenterY={getRectangleCenterCoordinates('rectangle1').top + 100 / 2}
  :rectangle2CenterX={getRectangleCenterCoordinates('rectangle2').left + 200 / 2}
  :rectangle2CenterY={getRectangleCenterCoordinates('rectangle2').top + 200 / 2}
/>
{/if}


<ConnectingLine
  :rectangle1CenterX={getRectangleCenterCoordinates('rectangle1').left + 100 / 2}
  :rectangle1CenterY={getRectangleCenterCoordinates('rectangle1').top + 100 / 2}
  :rectangle2CenterX={getRectangleCenterCoordinates('rectangle2').left + 200 / 2}
  :rectangle2CenterY={getRectangleCenterCoordinates('rectangle2').top + 200 / 2}
/>
-->

{JSON.stringify(nodes)}
{JSON.stringify(node_positions)}
<DynamicNode fields={data} />

<br>

<Web bind:nodes bind:node_positions />
  