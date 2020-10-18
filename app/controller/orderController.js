const Order = require('../models/order')
const orderController ={}

orderController.create = (req,res) =>{
    const body = req.body
       
    Order.insertMany(body)   
    
    .then(order =>{ 
        res.json(order )
    })
    .catch(err =>{ 
        res.json(err)
    })
}

orderController.list =(req,res) =>{     
    if(req.user.role === 'Admin'){
        Order.find()
        .then( order =>{
            res.json(order)
        })
    
        .catch(err =>{
            res.json(err)
        })
    } else {
        res.json({
            error: 'Accessable only by Admins'
        })
    }
   
}


orderController.listforCustomer =(req,res) =>{      
    Order.find({customerID : req.user._id })
    .then(order =>{
        res.json(order)
    })
    .catch(err=>{
        res.json(err)
    })
}



module.exports = orderController