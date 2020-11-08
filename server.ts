import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get('/api/photo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(
      `https://api.unsplash.com/photos/${id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const json = await response.json();
    res.send(json);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});

app.get('/api/autocomplete/:searchterm', async (req, res) => {
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

app.get('/api/search/:searchterm/:page?', async (req, res) => {
  try {
    const { searchterm, page = 1 } = req.params;
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${searchterm}&per_page=15&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const json = await response.json();
    res.send(json);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
