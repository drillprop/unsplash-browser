import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.post('/autocomplete/:searchterm', async (req, res) => {
  try {
    const response = await fetch(
      `https://unsplash.com/nautocomplete/${req.params.searchterm}`
    );
    const json = await response.json();
    res.send(json);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
