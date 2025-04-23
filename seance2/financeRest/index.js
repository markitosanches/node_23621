const express = require('express')
const request = require('request')
const app = express()
const config = require('./config.js')


app.get('/ticker=:id', (req, res) => {
    const ticker = req.params.id
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${config.API_KEY}`
    // console.log(ticker)
    // res.send(ticker)
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data);
        }
    });
})

const PORT = config.PORT
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})