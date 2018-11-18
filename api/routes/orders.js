const express = require('express')
const router=express.Router()


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'FETCH ALL ORDERS'
    })
})

router.post('/',(req,res,next)=>{
    const order={
        orderId: req.body.orderId,
        quntity: req.body.quntity
    }

    res.status(201).json({
        message: 'ORDER WAS CREATED',
        order:order
    })
})

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message: 'FETCH CURRENT ORDERS'
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
    console.log(req.params)
    res.status(200).json({
        message: 'ORDERS WAS DELETED'
        ,id:id
    })
})

module.exports=router