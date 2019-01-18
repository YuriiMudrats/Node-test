const mongoose=require('mongoose')
const Order=require('../models/order')
const Product=require('../models/product')

exports.orders_get_all=(req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .populate('product','name')
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
}
exports.orders_create=(req,res,next)=>{
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
            productId:req.body.productId,
            quantity:req.body.quantity
        })
        order.save()
        .then(doc=>{
            res.status(201).json({            
                order:{
                 _id:doc._id,
                 productId:doc.product,
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
    
    
}

exports.get_order_by_id=(req,res,next)=>{
    console.log(req)
    Order.findById({_id:req.params.orderId})
    .exec()
    .then(doc=>{
        console.log(doc)
        if(!doc){
           return res.status(500).json({
                message: 'Cant found order'
            })          
        }
        res.status(200).json({
            order:doc
        })
    })
    .catch(
        err=>{
            res.status(500).json({
                message: 'Cant found order',
                error:err
            }) 
        }
    )
    
}

exports.update_order_by_id=(req,res,next)=>{
    const id =req.params.orderId
    res.status(200).json({
        message: 'EDIT ORDER'
        ,id:id
    })
}

exports.delete_order_by_id=(req,res,next)=>{
    const id =req.params.orderId  
    Order.deleteOne({_id:id})
    .exec()
    .then(order=>{
        res.status(200).json({
            message: 'ORDERS WAS DELETED'
            ,id:id
        })       
    })
    .catch(err=>{
        res.status(500).json({
            message: err            
        }) 
    })  
    
}