const express = require('express')
const request = require('request')
const app = express()
const fs = require('fs')
const config = require('./config.js')
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/ticker=:id', (req, res) => {
    const ticker = req.params.id
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${config.API_KEY}`
    // console.log(ticker)
    // res.send(ticker)
    request.get({
        url: url,
        json: true
      }, (err, response, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (response.statusCode !== 200) {
          console.log('Status:', response.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data);
          fs.writeFile(`${ticker}.json`, JSON.stringify(data), (err) => {
            if (err) return res.status(500).send('Error saving file!');
            res.redirect(`/view?ticker=${ticker}`)
          })
        }
    });
})

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/data=:id', (req, res) => {
  const filePath = `${__dirname}/${req.params.id}.json`
  console.log(filePath)
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send({error: 'Data not found'});
    res.json(JSON.parse(data))
  })
})

const PORT = config.PORT
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})