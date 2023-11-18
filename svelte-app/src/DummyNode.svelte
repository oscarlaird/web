<script>
    // Props received by the component
    export let fields = {};
  
    // Reactive statement to get keys and values from the fields object
    $: entries = Object.entries(fields);
  </script>
  
<style>
.rectangle {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    max-width: 200px;
}
</style>

<div class="rectangle">
{#each entries as [key, value]}
    <div>
    <strong>{key}:</strong> {value}
    </div>
{/each}
</div>
