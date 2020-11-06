import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get('/autocomplete/:searchterm', async (req, res) => {
  try {
    const { searchterm } = req.params;
    const response = await fetch(
      `https://unsplash.com/nautocomplete/${searchterm}`
    );
    const json = await response.json();
    res.send(json.autocomplete);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});

app.get('/search/:searchterm', async (req, res) => {
  try {
    const { searchterm } = req.params;
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${searchterm}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const json = await response.json();
    res.send(json);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
