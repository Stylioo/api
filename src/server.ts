import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello! Stylioo API');
})

app.listen(5400, () => {
    console.log('Server is running on port 5400.');
})