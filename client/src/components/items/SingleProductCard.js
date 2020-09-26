import React from 'react'
import {Link} from 'react-router-dom'  
import VanillaTilt from 'vanilla-tilt'
import './SingleProductCard.css' 

function SingleProductCard (props){

      VanillaTilt =  VanillaTilt.init( document.querySelectorAll(".product_box"), {
          max: 25,
          speed: 200
        });  
    
    return(
        <div className ='product_container' >
            <div className ='product_box' >   
            {
                localStorage.getItem('token') &&  props.user.length ?
                    props.user[0].role !=='Admin' ? 
                        <Link to ='/cart' className =  'product__addCart'
                        onClick ={props.handleSubmit}   > ADD TO CART </Link>                   
                    :  
                    <Link to ='/login' className =  'product__LoginToAdd'> 
                        Admin Can't order !</Link>    
                        
                :
                <Link to ='/login' className =  'product__LoginToAdd'> 
                        Login to order the product</Link>    
            }               
                <div className = 'circle'></div>               
                <img src = {require(`../../upload/${props.image}`)} alt ='Pic not found' className ='singleproduct__image' /> 
            </div> 

        </div>
    )
}

export default SingleProductCard