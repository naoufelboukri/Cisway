// --- IMPORT ---
const express = require('express');
const DB = require('./db.config');
// --------------

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// --- ENDPOINTS ---
app.get('/', (req, res) => {
  DB.query("SELECT username FROM users", (err, result, fields) => {
    if (err) throw err;
    res.send(result);
  })
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
})