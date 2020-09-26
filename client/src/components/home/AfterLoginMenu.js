import React from 'react'
import {Link} from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './Login.css'

function AfterLoginMenu(props){

    const handleLogout = () =>{
        localStorage.removeItem('token')
         window.location.href ='/'
         
      } 
      
      const propsData =   props.userData.length  ? props.userData[0] : ''
      
    return(
      
        <div className ='Menu_headerNav'>  
            {
                <div className ='Menuheader__link '  >                                      
                {                                                
                     propsData.role ==='Admin' ?                                                
                        <div className="header__option">
                            <button type="button" className="profile__button dropdown-toggle"
                             data-toggle="dropdown"   aria-haspopup="true" aria-expanded="false">
                                Account
                            </button>
                            <div className="dropdown-menu">
                                <Link to ='/account' className ='dropdown-item' > Profile </Link>
                                <Link to ='/products/add' className ='dropdown-item' > Add Product </Link>
                                <Link to ='/orders' className ='dropdown-item' > Orders Summary </Link>
                                <Link to ='/categories/list' className ='dropdown-item' > Categories List </Link>
                                <Link to ='/categories/update' className ='dropdown-item' >Add/Update Category </Link>
                                <Link to ='/products/list' className ='dropdown-item' > Products Summary </Link>                                                            
                            </div>  
                                                
                        </div>
                    :   
                    <div className="header__option">
                        <button type="button" className="profile__button  dropdown-toggle"
                        data-toggle="dropdown"   aria-haspopup="true" aria-expanded="false">
                            Account
                        </button>
                        <div className="dropdown-menu">
                            <Link to ='/account' className ='dropdown-item' > Profile </Link>
                            <Link to ='/orders/summary' className ='dropdown-item' > My Orders </Link>                                                                                                                                  
                        </div>  
                    </div>                                               
                } 
                              
            </div> 
            }
             <Link to ='/cart' className ='Menuheader__link'> 
                <div  className ='header__option'>  
                    <ShoppingCartIcon className ='header__cart' />                      
                </div>                                             
            </Link>
            
            <Link to ='/' className ='Menuheader__link'> 
                <div  className ='header__option'>  
                    <ExitToAppIcon className ='header__signOut' onClick ={handleLogout} />                      
                </div>                                             
            </Link>  
                     
                     
        </div>
    )
}

export default AfterLoginMenu