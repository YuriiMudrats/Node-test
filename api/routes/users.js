const express=require('express')
const router=express.Router()
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const User = require('../models/user')

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(422).json({
                message:'User existed'
            })
        }else{
            bcrypt.hash(req.body.email,10,(err,hash)=>{
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
                        console.log(user)
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

module.exports=router