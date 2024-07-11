const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let savedData = '';

app.post('/save', (req, res) => {
    savedData = req.body.data;
    res.send('Data saved!');
});

app.get('/data', (req, res) => {
    res.json({ data: savedData });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
