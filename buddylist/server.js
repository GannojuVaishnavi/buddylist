const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('public'));
app.get('/buddylist', (req, res) => {
  fs.readFile('./data/buddy-list.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(data)
      res.status(200).json(JSON.parse(data));
    }
  });
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
