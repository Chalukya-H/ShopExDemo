import axios from 'axios'
const URL = 'http://localhost:3030'
 

export const addProductinfo= (product) => {
    return { type: 'ADD_PRODUCT', payload: product}
} 

export const addProduct = (productInfo,redirect)=>{
 
    return(dispatch) =>{
        axios.post(`${URL}/products`,productInfo,{
            headers : { 
                'Content-Type' :'multipart/form-data'
            }
        })
        .then(response =>{
            dispatch(addProductinfo(response.data))
            redirect()
        })
        .catch( err =>{
            console.log(err)
        })
    }
}


export const getProductinfo= (product) => {
    return { type: 'UPDATE_PRODUCT', payload: product}
} 

export const getProducts = ()=>{ 
    return(dispatch) =>{
        
        axios.get(`${URL}/products`,{
            headers : { 
                'Content-Type' :'multipart/form-data',
                'auth' : localStorage.getItem('token') 
            }
        })
        .then(response =>{  
            dispatch(getProductinfo(response.data   ))
        })
        .catch( err =>{
            console.log(err)
        })
    }
}
 

export const getTopProducts = ()=>{
    
        return(dispatch) =>{
            axios.post(`${URL}/products/topnew`)
            .then(response =>{
                 
                dispatch(addProductinfo(response.data))
                 
            })
            .catch( err =>{
                console.log(err)
            })
        }
    }


export const getProductsbyCategory = (id,redirect)=>{    
    return(dispatch) =>{
        axios.get(`${URL}/products/query/${id}`, {
            headers : { 
                'Content-Type' :'multipart/form-data'
            }
        })
        .then(response =>{ 
            dispatch(addProductinfo(response.data))   
            redirect()         
        })
        .catch( err =>{              
            console.log(err)
        })
    }
}

    
export const getProductsbyID = (id)=>{    
    return(dispatch) =>{
        axios.get(`${URL}/products/${id}`, {
            headers : { 
                'Content-Type' :'multipart/form-data'
            }
        })
        .then(response =>{                
            dispatch(addProductinfo(response.data))
                
        })
        .catch( err =>{
            console.log(err)
        })
    }
}


export const getProductsbyQuery = (searchText)=>{ 
    return(dispatch) =>{
         
        axios.get(`${URL}/products/search/${ searchText}`,{ 
            headers : { 
                'Content-Type' :'multipart/form-data'
            }
        })
        .then(response =>{   
            
            dispatch(addProductinfo(response.data))
            
        })
        .catch( err =>{
            console.log(err)
        })
    }
}


export const updateProductinfo= (product) => {
    return { type: 'EDIT_PRODUCT', payload: product}
} 

export const updateProduct = (formData, id , redirect) =>{
    return(dispatch) =>{ 
        axios.put(`${URL}/products/update/${id}`,formData )
        .then(response =>{  
            dispatch(updateProductinfo(response.data))
            redirect()
        })
        .catch( err =>{
            console.log(err)
        })

         
    }
}