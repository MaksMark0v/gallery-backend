import express from 'express';

import getRandomInt from './helpers/random-numbers.js';

// import index from './resourses/index.html'

const app = express();
const API_PORT = 5002;

app.get('/', (req, res) => {
    const randomNumber = getRandomInt(1, 100);
    res.send(`Hello World!\nFrom express\n${randomNumber}`);
});


app.get('/page', (req, res) => {
    
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery docs</title>
</head>
<body style="background-color: black;">
    <h1 style="text-align: center; color: aliceblue;">Gallery Documentation</h1>    
</body>
</html>`);

});

app.listen(API_PORT, () => {
    console.log(`Server running at http://localhost:${API_PORT}/`)
});

