const express = require('express')
const router=express.Router()
const mongoose=require('mongoose')

const Order=require('../models/order')
const Product=require('../models/product')

router.get('/',(req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .then(data=>{
        res.status(200).json({
            count: data.length,
            orders: data
        })
    }        
        )
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
})

router.post('/',(req,res,next)=>{
    Product.findById({_id:req.body.productId})
    .exec()
    .then(product=>{
        if(!product){
            return res.status(404).json({
                message:'Product dont found',
            })
        }
        const order=new Order({
            _id:mongoose.Types.ObjectId(),
            product:req.body.productId,
            quantity:req.body.quantity
        })
        order.save()
        .then(doc=>{
            res.status(201).json({            
                order:{
                 _id:doc._id,
                 product:doc.product,
                 quantity:doc.quantity
                }
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })

    })
    .catch(err=>{
        res.status(500).json({
            message:'Product dont found',
        })
    })
    
    
})

router.get('/:orderId',(req,res,next)=>{
    Order.findById({_id:req.body.orderId})
    .exec()
    .then(doc=>{
        if(!doc){
           return res.status(500).json({
                message: 'Cant found order'
            })          
        }
        res.status(200).json({
            order:doc
        })
    })
    .catch()
    res.status(500).json({
        message: 'Cant found order'
    })
})

router.patch('/:orderId',(req,res,next)=>{
    const id =req.params.orderId
    res.status(200).json({
        message: 'EDIT ORDER'
        ,id:id
    })
})

router.delete('/:orderId',(req,res,next)=>{
    const id =req.params.orderId    
    res.status(200).json({
        message: 'ORDERS WAS DELETED'
        ,id:id
    })
})

module.exports=router