const mongoose = require('mongoose')
const validator =  require('validator')
const Schema = mongoose.Schema

const orderSchema = new Schema ({
    
    name :{
        type : String,
        required:true
    } ,
    price : {
        type :Number,
        required : true
    },
    quantity :{
        type : Number,
        default : 1
    } ,
    customerID : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    image : {
        type : String
    },
    address:{
        type:String,
        required:true
    },
    // contactNum : {
    //     type :Number,
    //     required:true,
    //     minlength :10,
    //     maxlength:13
    // },
    email :{
        type : String,
        required:true,
        unique:true,
        validate  :{
            validator : function(value) {
                return validator.isEmail(value)
            },
            message : function() {
                return 'Invalid Email format'
            }

        }
    },
    status :{
        type : String,
        default : 'Ordered'
    },
    orderAt: {
        type: Date,
        default: Date.now
    },
    deliveredAt :{
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000)
    }
     
})


const Order = mongoose.model('Order' , orderSchema)

module.exports = Order