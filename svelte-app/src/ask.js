
export async function ask_gpt(question, nodes) {
    let prompt = compile_prompt(question, nodes);
    let url = `http://localhost:5010/ask?question=${question}`;
    let data = await fetch(url).then(res => res.json())
    return data;
}

function compile_prompt(question, nodes) {
  let prompt = "Use the following information to answer the question:\n";
  nodes.forEach((node, index) => {
    prompt += JSON.stringify(node);
  });
  prompt += "Question: ";
  prompt += `${question}\n`;
  return prompt;
}