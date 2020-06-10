const Article = require('../models/Article')

const article = (req,res,next) => {
    let article = new Article({
        title:req.body.title,
        body:req.body.body,
        author:req.body.author
    })

    article.save()
      .then(response => {
        return res.status(201).json({
              message:'New article created'
          })
      })
      .catch(error =>{
          res.json({
              message : 'an error occured'
          })
      })
    
}

const index = (req,res,next) => {
    Article.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message:'an error occured'
        })
    })

}

module.exports = {
   article ,index
}