const express = require('express')
const router=express.Router()


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'GET METHOD'
    })
})

router.post('/',(req,res,next)=>{
    const product={
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'POST METHOD',
        product:product
    })
})
router.get('/:productId',(req,res,next)=>{
    console.log(req.params)
    res.status(200).json({
        message: 'FETCH PRODUCTS'
    })
})

router.patch('/:productId',(req,res,next)=>{
    const id =req.params.productId
    res.status(200).json({
        message: 'patch METHOD'
        ,id:id
    })
})

router.delete('/:productId',(req,res,next)=>{
    const id =req.params.productId
    res.status(200).json({
        message: 'PRODUCTS WAS DELETED'
        ,id:id
    })
})

module.exports=router