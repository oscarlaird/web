//TODO: npm install express, openai packages

/*
const express = require('express');
const app = express();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey:''}); //insert API key here

app.use(express.json());
app.use(express.static('public'));

//make request to OpenAI API based on web page's TextField input 
app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            //setup context 
            { role: "system", content: "Compare these documents: ... " },
            //user's text field 
            { role: "user", content: userInput }
        ],
    });

    res.json({ message: response.choices[0].message.content }); //display the ChatGPT response
});

//setup local node server 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/

/*

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: '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',
});

export async function makeChatGPTCall(userInput) {
  try {
    const response = await openai.complete({
      prompt: userInput,
      model: 'gpt-3.5-turbo',
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 1.0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return '';
  }
}

*/