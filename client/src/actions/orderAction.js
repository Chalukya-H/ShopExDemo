import axios from 'axios'
import swal from 'sweetalert'
import {getProducttoCart} from './cartAction'

const URL = "http://localhost:3030"

export const setOrderSummary = (orders) =>{
    return {type: 'SET_ORDERS' ,  payload:orders}
}
export const getOrderSummary =()=>{
    return(dispatch) => {
        axios.get(`${URL}/orders` , {  headers : {
            'auth' : localStorage.getItem('token') 
             }
        })

         .then(response => { 
             if(response.data.hasOwnProperty('error')){
                 
                swal({
                    title: response.data.error,                     
                    icon: "error" ,
                    button :'OK'                   
                  }).then( ()=>{
                      window.location.href='/'
                  }) 
                   
                
                
             }           
            else{
                dispatch( setOrderSummary(response.data) )
            }
             
         })
         .catch(err =>{
             console.log(err)
         })         
    }
}

export const getOrdersDetails =()=>{
    return(dispatch) => {
        axios.get(`${URL}/orders/list` , {  headers : {
            'auth' : localStorage.getItem('token') 
             }
        })

         .then(response => { 
             if(response.data.hasOwnProperty('error')){                 
                swal({
                    title: response.data.error,                     
                    icon: "error" ,
                    button :'OK'                   
                  }).then( ()=>{
                      window.location.href='/'
                  })  
             }           
            else{
                dispatch( setOrderSummary(response.data) )
            }
             
         })
         .catch(err =>{
             console.log(err)
         })         
    }
}



export const addOrderInfo = (order) =>{
    return {type: 'CREATE_ORDER' ,  payload:order}
}

export const addProductstoOrder = (formData , refresh) =>{
    return(dispatch) => {     
            
        axios.delete(`${URL}/cart/delete/all`, {  headers : {
            'auth' : localStorage.getItem('token') 
             }
            })
         .then(response => {  
              if( response.data.hasOwnProperty('error')){
                  alert (response.data)
              } else {                  
                dispatch(getProducttoCart())               
                
                axios.post(`${URL}/orders`,formData,{  headers : {
                    'auth' : localStorage.getItem('token') 
                     }
                    })
                
                    .then(response =>{
                        if( response.data.hasOwnProperty('error')){
                            alert (response.data)
                        } else {
                             dispatch ( addOrderInfo(response.data) )
                             refresh()
                        }

                    })
                    .catch(err =>{
                        console.log(err)
                    })
                
              }
            })
            
        .catch(err =>{
            console.log(err)
        })
    }        
}