require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

// Function to translate text
async function translateText(text, to) {
  const options = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      from: "auto",
      to: to,
      text: text
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Endpoint to handle translation requests
app.post('/translate', async (req, res) => {
  const {to,  text } = req.body;
  console.log(to);
  try {
    const translation = await translateText(text, to);
    res.json(translation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get available languages
app.get('/languages', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
      'Accept-Encoding': 'application/gzip'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});