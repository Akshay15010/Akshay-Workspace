const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 10000;
const bodyParser = require('body-parser');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(express.static('public'));

// Save data endpoint
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

// Load data endpoint
app.get('/loadData', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading data');
        } else {
            res.json({ data });
        }
    });
});

// Upload file endpoint
app.post('/uploadFile', upload.single('file'), (req, res) => {
    const file = req.file;
    const filePath = path.join(__dirname, file.path);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.send(data);
            fs.unlink(filePath, () => {});
        }
    });
});

// Download file endpoint
app.get('/downloadFile', (req, res) => {
    const fileName = req.query.fileName;
    const filePath = path.join(__dirname, fileName);
    res.download(filePath, (err) => {
        if (err) {
            res.status(500).send('Error downloading file');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
