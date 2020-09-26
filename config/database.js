const mongoose = require('mongoose')

const configDB = () =>{
    // const connection_URL = 'mongodb+srv://Admin:Admin@cluster0.vj4ir.mongodb.net/<dbname>?retryWrites=true&w=majority'
    mongoose.connect('mongodb://localhost:27017/shopex-db' ,{useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true })
//    mongoose.connect(connection_URL , {
//     useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true 
//    })
    .then( ()=>{
        console.log('Database connection sucess')
    })
    
    .catch (err =>{
        console.log('Database connection error - ',err )
    })
}


module.exports = configDB