const express = require('express')
const app = express()
const port = 8081

app.get('/', (req, res) => {
    res.send('Hello Word')
    // console.log(req)
    //console.log(res)
})

app.get('/page', (req, res) => {
    res.send('Page 1')
})

app.use((req, res) => {
    res.status(404).send('404 page not found')
})



app.listen(port, () => {
 console.log(`Express app listening at ${port}`)
})