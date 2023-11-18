
<script>
    import { makeChatGPTCall } from '..scripts/chatgpt-api.js';
  
    let userInput = '';
    let chatGPTResponse = '';
  
    const handleSubmit = async () => {
      if (userInput) {
        chatGPTResponse = await makeChatGPTCall(userInput);
        userInput = '';
      }
    };
</script>


<style>

</style>



<input type="text" bind:value={userInput} />
<button on:click={handleSubmit}>Send</button>
  
<p>{chatGPTResponse}</p>