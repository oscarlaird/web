<script>
	import DummyNode from './DummyNode.svelte';
  
	let data = {
	  Name: 'John Doe',
	  Age: 30,
	  Occupation: 'Engineer'
	};
</script>
  
<DummyNode fields={data} />
  