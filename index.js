var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Configure multer for file uploads
var storage = multer.memoryStorage(); // Store files in memory
var upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST route to handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Get file details
  const fileDetails = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  // Respond with file details
  res.json(fileDetails);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
