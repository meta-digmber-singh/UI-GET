const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});