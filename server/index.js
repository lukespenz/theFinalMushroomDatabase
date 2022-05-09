// Dependencies
const express = require('express')
const cors = require('cors')
const path = require('path')

//Server variables
const port = process.env.PORT || 5555

//App & invokations
const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json());

//controller functions and axios requests assiociated
const {
    getMushroom,
    addMushroom,
    deleteMushroom
} = require('./controller')


app.get("/api/public/views/viewMushrooms", getMushroom)
app.post("/api/public/views/viewMushrooms", addMushroom)
app.delete("/api/public/views/viewMushrooms/:id", deleteMushroom)

//Pulls main app directory
app.get('/', (req, res) => {res.sendFile(path.join(__dirname + '/../public/index.html'))})

//Server port
app.listen(port, () => {
    console.log(`WAKE UP @ ${port}`)
})