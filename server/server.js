//1 require express
const express = require ('express');

// require dotenv
require('dotenv').config()

//2 instance of express
const app = express();
//middleware
app.use(express.json());//bodyparser

//require de la BD et l'appel de la fonction
const connectDB = require ('./config/configDB')
connectDB()
// route principale de la collection User
app.use('/api/auth', require("./route/auth.route"));

//roue pour l'admin (ce que l'admin peut faire)
app.use('/api/users',require("./route/users.route"));

// route pour tout le monde (users et visiteurs)
app.use('/api/pro', require("./route/pro.route") );



//3 port
const PORT = process.env.PORT;

//4 serveur
app.listen (PORT, (err) => {
    err
    ? console.log("l'erreur qui vient de se produire est:", err)
    : console.log(`le serveur est à l'écoute sur le port: http://localhost:${PORT}`)
}) 