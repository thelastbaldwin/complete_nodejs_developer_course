const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is 50 degrees.',
        location: 'Seattle'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});