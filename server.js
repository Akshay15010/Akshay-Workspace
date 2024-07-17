const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/saveData', (req, res) => {
    const data = req.body.data;
    fs.writeFile('data.txt', data, (err) => {
        if (err) {
            res.status(500).send('Error saving data');
        } else {
            res.send('Data saved successfully');
        }
    });
});

app.get('/loadData', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading data');
        } else {
            res.json({ data });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
