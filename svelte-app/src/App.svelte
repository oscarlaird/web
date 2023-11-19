<script>
	import { onMount } from "svelte";
	import { init_position_nodes } from "./position.js";
	import DummyNode from './DummyNode.svelte';
    import NodeSmall from './NodeSmall.svelte';
	import ConnectingLine from './ConnectingLine.svelte';
    import Toolbar from './Toolbar.svelte';
    //import OpenAiPrompter from './OpenAIPrompter.svelte';
	import DynamicNode from "./DynamicNode.svelte";
	import Web from "./Web.svelte";
    import NodeGame from "./NodeGame.svelte";

	let query;
  
	let data = {
	  Name: 'John Doe',
	  Age: 30,
	  Occupation: 'Engineer',
	  node_type: 'dummy-red'
	};


	let games_test_data = {
		name: 'Among Us',
		img_url: 'https://steamcdn-a.akamaihd.net/steam/apps/945360/header.jpg?t=1598556351',
		date: 'Nov 16, 2018',
		developer: 'Innersloth',
		full_desc: 'About this game: vibeo gamejbvoubvouyebwvuywgbvuyqbuqvbuqborvbvbuerb oruybwouyvoybvewboyu',
		price: '$4.99',
		url_info: 'https://store.steampowered.com/app/945360/Among_Us/'
	};

	/*
	//access games db
	import { getGames } from './gamesDatabase.js';

    let games = [];

    async function fetchData() {
        games = await getGames();
    }

    onMount(fetchData);
	*/


	//Leftover code fragment trying to draw svg line
	const getRectangleCenterCoordinates = (id) => {
		const rect = document.getElementById(id);
		if (rect) {
			return rect.getBoundingClientRect();
		}
		return null;
  	};

	let nodes = [];
	let node_positions = [];
	let selected_node_id;

	// on mount init_position_nodes
	onMount(async () => {
		({nodes, node_positions, selected_node_id } = await init_position_nodes("initial_query"));
	})

	async function search_query() {
		console.log(query);
		({nodes, node_positions, selected_node_id } = await init_position_nodes(query));
	}

</script>
  
<DummyNode fields={data} />
<NodeSmall fields={data} id={'rectangle1'} class='node_small' x={100} y={100} width={100} height={100}/>
<NodeSmall fields={data} id={'rectangle2'} x={300} y={300} width={200} height={200}/>
<NodeGame fields={games_test_data} id={'rectangle2'}/>
<Toolbar />

<input bind:value={query} />
<button on:click={search_query}>Search</button>


<Web bind:nodes bind:node_positions bind:selected_node_id />
  