const express = require('express')
const router=express.Router()
const mongoose=require('mongoose')

//MIDDLEWARE
const checkAuth=require("../middleware/check-auth")


//CONTROLLER

const OrderController=require('../controller/orders')
const Order=require('../models/order')
const Product=require('../models/product')

router.get('/',checkAuth,OrderController.orders_get_all)
router.post('/',checkAuth,OrderController.orders_create)
router.get('/:orderId',checkAuth,OrderController.get_order_by_id)
router.patch('/:orderId',checkAuth,OrderController.update_order_by_id)
router.delete('/:orderId',checkAuth,checkAuth,OrderController.delete_order_by_id)

module.exports=router