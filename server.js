require('dotenv').config()
const request = require('request')
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
// const AppRouter = require('./routes/AppRouter');
const http  = require('http').createServer.app;

const PORT = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (res) => res.status(200).send("yoooo it works"));
app.use('/api')
app.get('*', (res) => 
res.sendFile(path.join(__dirname, "client", "build", "index.html"))
)
http.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))