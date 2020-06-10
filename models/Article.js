const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type:String
    },

    body:{
        type : String
    },

    author:{
        type : String
    },
},{timestamps:true})

const Article = mongoose.model('Article',articleSchema)
module.exports = Article