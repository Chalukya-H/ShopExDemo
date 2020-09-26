import axios from 'axios'
import swal from 'sweetalert'
 

const URL = "http://localhost:3030"
 


export const setUserInfo = (user) =>{
    return {type: 'SET_USER' ,  payload:user}
}

export const stratLogin = (userData,redirect,refresh) =>{
     console.log(redirect)
    return(dispatch) => {
        axios.post(`${URL}/users/login`,userData)
        .then(response => {
            if(response.data.hasOwnProperty('error')){                
                
                swal({
                    title: response.data.error,                     
                    icon: "error" ,
                    button :'OK'                   
                  })
             } 
             else {
                 localStorage.setItem('token',response.data.token)
                  
                 axios.get(`${URL}/users/account`,{headers :{
                     'auth':localStorage.getItem('token')
                    }
                 })

                 .then(response =>{ 
                     dispatch(setUserInfo(response.data))
                     swal({
                        title: 'Login Successfull !',                    
                        icon: "success",
                        button :'OK'                     
                      }).then( ()=>{
                        // redirect() 
                        // this.props.history.push('/ShopEx')    
                        refresh()
                      }) 

                    
                 })

                 .catch(err=>{
                     console.log(err)
                 })
                  

             }
        })

        .catch(err =>{
            console.log(err)
        })
    }

}

export const startRegister = (userData,refresh) =>{

    return(dispatch) =>{
        axios.post(`${URL}/users/register`,userData)
        .then( response =>{
            
            if(response.data.hasOwnProperty('error') || response.data.hasOwnProperty('errors')){                
                console.log(response.data) 
                alert(response.data.error)
                
                refresh()
            }
            else {  
                           
                swal({
                    title: 'Registered Successfully !',                    
                    icon: "success",
                    button :'OK'                     
                  }).then( ()=>{
                     
                    refresh()
                  }) 
               
            }
        })

        .catch(err =>{
            console.log(err)
        })
    }
}

 
export const startGetUser =() =>{
    return(dispatch) => {
        axios.get(`${URL}/users/account` , {  headers : {
            'auth' : localStorage.getItem('token') 
             }
        })

         .then(response => {            
             dispatch( setUserInfo(response.data) )
             
         })
         .catch(err =>{
             console.log(err)
         })         
    }
}


export const editUser = (user) => {
    return {   type: 'EDIT_USER',   payload: user   }
}

export const EditUserInfo = (userData,id,refresh) =>{
   
    return(dispatch) =>{
        axios.put(`${URL}/users/${id}`,userData,{
            headers : {
                'auth' : localStorage.getItem('token') 
                 }
        })

        .then( response =>{
            
            if(response.data.hasOwnProperty('error') || response.data.hasOwnProperty('errors')) {
                alert('Customer Data not Updated !')
            } else {
                const user = response.data
                dispatch(editUser(user))
                refresh()        
            }
        })
    }
}