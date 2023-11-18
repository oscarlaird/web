<script>
    // Props received by the component
    export let fields = {};
  
    // Reactive statement to get keys and values from the fields object
    $: entries = Object.entries(fields);
</script>
 
<div class="rectangle">
{#each entries as [key, value]}
    <div>
    <strong>{key}:</strong> {value}
    </div>
{/each}
</div>
 

<style>
.rectangle {
    border: 1px solid red;
    padding: 10px;
    margin: 10px;
    max-width: 200px;
}
</style>