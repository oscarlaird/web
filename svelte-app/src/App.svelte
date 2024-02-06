<script>
	import { onMount } from "svelte";
	import { init_position_nodes } from "./position.js";
	import { ask_gpt } from "./ask.js";
	import DummyNode from './DummyNode.svelte';
    import NodeSmall from './NodeSmall.svelte';
	import ConnectingLine from './ConnectingLine.svelte';
    import Toolbar from './Toolbar.svelte';
    //import OpenAiPrompter from './OpenAIPrompter.svelte';
	import DynamicNode from "./DynamicNode.svelte";
	import Web from "./Web.svelte";
    import NodeGame from "./NodeGame.svelte";
    import { bind } from "svelte/internal";

	// import  query and dataset from writable stores.js
	import { dataset } from "./stores.js";

	let query;
	// let dataset;
	let question;
	let answer = 'OpenAI Response Here';
  
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


	let nodes = [];
	let node_positions = [];
	let selected_node_id;

	// on mount init_position_nodes
	onMount(async () => {
		({nodes, node_positions, selected_node_id } = await init_position_nodes("initial_query", dataset.value));
		search_query();
	})

	async function search_query() {
		console.log(query);
		({nodes, node_positions, selected_node_id } = await init_position_nodes(query, dataset.value));
	}

	async function ask() {
		console.log("ask", nodes);
		data = await ask_gpt(question, nodes);
		answer = data.answer;
	}

	// reactively run search_query when dataset changes
	$: if (dataset) search_query();

</script>

<div class="searchabove">
	<input type="text" bind:value={query} on:change={search_query} placeholder="Search CS courses..." />
</div>
  
{#if false}
<div class="toolbar-container">
	<Toolbar bind:query on:click={search_query} bind:dataset on:ask={ask} answer={answer} bind:question />
</div>
{/if}

<Web bind:nodes bind:node_positions bind:selected_node_id bind:dataset />

<style>
	/* toolbar-container is absolute positioned in center top (overlay w/ opacity) */
	.toolbar-container {
		padding-top: 50px;
		padding-left: 20px;
		padding-right: 20px;
		position: absolute;
		height: 100%;
		width: 440px;
		left: 0;
		top: 0;
		z-index: 1;
		/* set background opacity to 60% */
		background-color: var(--primary);
	}
	.searchabove {
		position: absolute;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
	}
	.searchabove input {
		width: 600px;
		font-size: large;
	}
</style>
  