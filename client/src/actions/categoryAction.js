import axios from 'axios'
 
 export const redirect = (path) =>{
    return window.location.href = path            
}
const URL = "http://localhost:3030"

export const setCategoryInfo = (category) =>{
    return {type: 'SET_CATEGORY' ,  payload:category}
}
export const getCategories =()=>{
    return(dispatch) => {
        axios.get(`${URL}/categories`)

         .then(response => {        
             dispatch( setCategoryInfo(response.data) )
             
         })
         .catch(err =>{
             console.log(err)
         })         
    }
}

export const updateCategoryInfo = (category) =>{
    return {type: 'CREATE_CATEGORY' ,  payload:category}
}

export const addCategories = (formdata,path)=>{
    return(dispatch) => {
         
        axios.post(`${URL}/categories`, formdata)
         .then(response => {  
             dispatch( updateCategoryInfo(response.data) )
              redirect(path)
         })
         .catch(err =>{
             console.log(err)
         })         
    }
}



export const editCategoryInfo = (category) =>{
    return {type: 'EDIT_CATEGORY' ,  payload:category}
}

export const updateCategories = (formdata,path)=>{
    return(dispatch) => {
         
        axios.put(`${URL}/categories/update`, formdata)
         .then(response => {  
             dispatch( editCategoryInfo(response.data) )
              redirect(path)
         })
         .catch(err =>{
             console.log(err)
         })         
    }
}



