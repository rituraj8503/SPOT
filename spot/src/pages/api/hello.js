

export default async function handler(req, res) {
  const { Configuration, OpenAIApi } = require("openai");

  const openai = new OpenAIApi(new Configuration({
    // replace your-api-key with your API key from ChatGPT
    apiKey: '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'
  }))
  try {
    const resp = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a helpful assistant, and seek to help users who want to store data on the cloud."},
          { role: "user", content: req.body.question}
        ]
    })

    res.status(200).json({message: resp.data.choices[0].message.content})
  } catch(e) {
    res.status(400).json({message: e.message})
  }
}
