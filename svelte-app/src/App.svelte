<script>
	import DynamicNode from "./DynamicNode.svelte";
	import Web from "./Web.svelte";
  
	let data = {
	  Name: 'John Doe',
	  Age: 30,
	  Occupation: 'Engineer',
	  node_type: 'dummy-red'
	};
</script>
  
<DynamicNode fields={data} />

<br>

<Web />
  