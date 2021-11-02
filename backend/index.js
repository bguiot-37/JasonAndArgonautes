const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// base de données
const mysql = require('mysql');
const dbConnect = mysql.createConnection({
  user: process.env.databaseUser,
  password: process.env.databasePassword,
  host: process.env.databaseHost,
  database: process.env.databaseName
})
dbConnect.connect((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log("Database connected")
  }
})

// routes
app.get('/', (req, res) => {
  dbConnect.query("SELECT nom FROM argonautes;", (error, result) => {
    res.send(result);
  });
})

app.post('/', (req, res) => {
  const nom = req.body.nom;
  dbConnect.query("INSERT INTO argonautes (nom) VALUES(?)", nom, (error, result) => {
    if(error) {
      throw error;
    } else {
      res.status(200).json("enregistrement ok");
    }
  })
})


app.listen(8080, () => console.log("Server connected"))