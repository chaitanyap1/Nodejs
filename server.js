const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')

const AuthRoute =  require('../server/routes/auth')
const ArticleRoute = require('../server/routes/article')

mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error',(err) => {
    console.log(err)
})

db.once('open',() => {
    console.log('database connection established')
})

const app = express()
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port $(PORT)`)
})

app.use('/',AuthRoute)
app.use('/',ArticleRoute)
