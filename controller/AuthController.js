const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req , res , next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error:err
            })
        }

        let user = new User({
            username : req.body.username,
            password:hashedPass,
            email:req.body.email,
            address:req.body.address
        })
    
        user.save()
        .then(user => {
            return res.status(201).json({
                message: 'new user created'
            })
        })
        .catch(error => {
            res.json({
                message:'An error occured'
            })
        })
        
        
    })
}

const login = (req,res,next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({username})
    .then(user => {
        if(user){
            bcrypt.compare(password,user.password, function(err,result){
                 if(err) {
                     res.json({
                         error: err
                     })
                 }
                 if(result){
                     let token = jwt.sign({name:user.name},'verySecretValue',{expiresIn:'1h'})
                     
                     res.json({
                         message:'Sucess',
                         token,
                     })
                     
                 }else{
                     res.json({
                         message : 'password does not matched'

                     })
                 }
            })
        }else{
            res.json({
                message:'No user found'
            })
        }
    })
} 


module.exports = {
    register,login
}