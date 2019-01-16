const express = require('express')
const router=express.Router()
const mongoose=require('mongoose')

//MODELS
const Product=require('../models/produst')

router.get('/',(req,res,next)=>{
    Product.find().exec().then(data=>{
        res.status(200).json(data)
    }
    ).catch(err=>{
        res.status(500).json({
            message:err
        })
    }
    )
    
})

router.post('/',(req,res,next)=>{
   
    const product= new Product({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })

    product.save().then(
        (data)=>{
            res.status(201).json({
                message: 'POST METHOD',
                product:data
            })
        }).catch(err=>{
            res.status(500).json({
                message:'product dont crated'
            })
        })
    
    })

router.get('/:productId',(req,res,next)=>{
    const id =req.params.productId
    Product.findById(id).exec().then(
        data=>{
            
            if(data){
                res.status(200).json(data)  
            }else{
                res.status(404).json({
                    message:'cant created for provided ID'
                })
            }
        }
    ).catch(err=>{
        res.status(500).json({
            error:err
        })
    })

    
})

router.patch('/:productId',(req,res,next)=>{
    const id =req.params.productId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.name]=ops.value 
    }
    Product.update({_id:id},{$set:updateOps})
    .exec()
    .then(data=>{
        res.status(200).json({            
            id:id,
            data
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
})

router.delete('/:productId',(req,res,next)=>{
    const id =req.params.productId
    Product.remove({_id:id})
    .exec()
    .then(data=>{
        res.status(200).json({
            delete: true
            ,id:id,
            data
        })
    })
    .catch(err=>{
        res.status(500).json({
            mesage:'cant deleted'
        })
    })
    
})

module.exports=router