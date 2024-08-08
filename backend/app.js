const express = require('express');
const app = express();
// const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require("fs").promises   
const path = 'backend/dic.json'


// app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Обработчик маршрута /contact
app.get('/data' , function(request, response) {
  async function read() {
    const data = await fs.readFile(path, 'utf8');
    response.json(data)
  }
  read()
});

app.post('/data', function(req, res) {
  const newWords = req.body 
  async function write(config) {
    await fs.writeFile(path, JSON.stringify(config, null, 2))
  }
  write(newWords)

  res.status(200).json({ message: 'Data received successfully' });
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});


