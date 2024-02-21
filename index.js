require('dotenv').config()
console.log(process.env.PASSWORD)
const express = require('express')
const app = express()
const port = 5001

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://gyun1712:' + process.env.PASSWORD + '@boilerplate.bvmdqhj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected... "))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send("Hello"))
app.listen(port, () => console.log(`Example app listening on port ${port}`))