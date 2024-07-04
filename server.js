import express from 'express'

import {getFoods, getFood} from './database.js'

const app = express()

app.use(express.json())

import cors from "cors"
app.use(cors())

app.use(express.static("public"))

app.get("/public", (req, res) => { 
    res.sendFile("index.html")
})

app.get("/foods", async (req, res) => {
    const foods = await getFoods()
    res.send(foods)
})

app.get("/wholefoods", (req, res) => {
    res.send("This also works")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(4040, () => {
    console.log("Listening on port 4040")
})