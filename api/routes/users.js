const express=require('express')
const router=express.Router()
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
//MODEL
const User = require('../models/user')


router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(422).json({
                message:'User existed'
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const user=new User({
                        _id:mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    })
                    user
                    .save()
                    .then(user=>{                        
                        res.status(201).json({
                            user:{
                                id:user._id,
                                email:user.email
                            }
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            error:err
                        })             
                    }
                    )
                }
            })
        }
    })  
    
})

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log(user)
        if(user.length<1){
            return res.status(401).json({
                message:'User don\'t\ found'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
         if(err){
             return res.status(401).json({
                 message:'Auth failed'
             })
         }
         console.log(err,result)
         if(result){
             const token=jwt.sign({
                 email:user[0].email,
                 userId:user[0]._id
             },process.env.JWT_KEY)
             return res.status(200).json({
                 auth:true,
                 token
             })
         }
         if(!result){
            res.status(401).json({
                message:'Auth failed'
            })
        
         }       
        })
    })
    .catch(err=>{
        res.status(401).json({
            message:'Auth failed',
            err
        })
    }
    )
})

router.delete('/:userId',(req,res,next)=>{
    const id =req.params.userId
    User.deleteOne({_id:id})
    .exec()
    .then(user=>{
        res.status(200).json({
            message:'User was deleted',
            user
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get('/',(req,res,next)=>{
    User.find()
    .exec()
    .then(user=>{
        if(user<1){
            return res.status(200).json({
                message:'Empty list of users'
            })
        }
        res.status(200).json({
            users:{
                count:user.length,
                users:user
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router