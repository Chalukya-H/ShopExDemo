import React from 'react'
import './ProductCard.css'

function ProductCard (props){
     
    return(
        <div className ='product'>
            <div className ='product__info'>
                <h5> {props.title} </h5>                
            </div>
            
            <img  src= { require(`../../upload/${props.image}`) } alt ='' className = 'product__image' />
            <p className = 'product__price'> 
                    <span className ="ruppe__icon fa fa-rupee"> </span>
                    <strong> {props.price}</strong>                    
            </p>
            <button className ='product__button'> View Details</button>
        </div>
    )
}

export default ProductCard