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

const getToken = (url, callback) => {

  const options = {
    url: process.env.GET_TOKEN,
    json: true,
    body:{
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials'
    }
  }
  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);

    callback(res)
  })
}

getToken(process.env.GET_TOKEN, (res) => {
  console.log(res);
})

app.get("/", (res) => res.status(200).send("yoooo it works"));
app.use('/api')
app.get('*', (res) => 
res.sendFile(path.join(__dirname, "client", "build", "index.html"))
)
http.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))