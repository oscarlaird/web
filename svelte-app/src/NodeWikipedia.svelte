<script>
    // Props received by the component
    export let fields = {};

</script>
  
<style>

.node_small {
    padding: 10px;
    margin: 10px;
    width: 250px;
    
	filter: drop-shadow(20px);
	border-radius: 20px;
    border: 5px solid black;
    border-color: #f4f4f4;

    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    transition: .1s;

    background-color: #f4f4f4;
}

.active {
    border: 5px solid black;
    border-color: tomato;
    transition: .1s;
}

.hover {
    border: 5px solid black;
    border-color: navy;
    transition: .1s;
}

</style>

<div class="node_small" >
    <!-- title -->
    <h2>{fields.title}</h2>
    <!-- content -->
    <p>{fields.content}</p>
</div>