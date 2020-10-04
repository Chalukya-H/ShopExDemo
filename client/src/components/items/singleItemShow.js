import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProductsbyID} from'../../actions/productAction' 
import {addProducttoCart} from '../../actions/cartAction'
import {startGetUser} from '../../actions/userAction' 
import SingleProductCard from './SingleProductCard' 
import './SingleProduct.css'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

class ShowSingleProduct extends React.Component{

    constructor () {
        super()
        this.state = {             
            quantity : 1  ,
            role: ''               
        }
    }
    componentDidMount () {                
        this.props.dispatch(getProductsbyID(this.props.match.params.id ))  
        this.props.dispatch(startGetUser())  
    }
 
    handleCartAdd = (product) =>{
        const formData = {
            name : product.name,
            price :product.price,
            quantity: this.state.quantity,
            image : product.cartImage,
            productID:product._id
        }
        
        const redirect = () =>{
            return window.location.reload();  
        }
        
        this.props.dispatch(addProducttoCart(formData,redirect))
    }

    render() {         
         return(
            <div className = 'product__container'> 
                {
                    this.props.products.length ?
                        this.props.products.map(product =>{
                            return (
                                <div className ='container-fluid' key = {product._id} > 
                                    <div className ='product__row'> 
                                        <SingleProductCard className ='col-12'
                                            image = {product.mainImage} 
                                            user = {this.props.users} 
                                            products = {product} 
                                            handleSubmit = { () =>{ this.handleCartAdd(product)}} />
                                    </div>
                                    <div className ='product__row2'>
                                        <div className ='product__details'>
                                            <h2 className ='product__Name'>{product.name}</h2>  
                                            <h4> <span className ='fa fa-rupee product__price'></span> { product.price}</h4>                                                                            
                                            <ul className = 'product__desc'  >
                                                {
                                                    
                                                    product.description ?
                                                    product.description.split('--').map((text,i) =>{
                                                        return text === ''? '' :  <li key ={i}>{text}</li>  
                                                    }) : ''
                                                }
                                            </ul>  
                                                                             
                                        </div>
                                        {
                                               localStorage.getItem('token') && this.props.users.length  ?
                                               this.props.users[0].role !=='Admin' ? 
                                                        <Link to ='/cart' className =  'product__Addcart'
                                                            onClick ={() =>{ this.handleCartAdd(product)}} >
                                                                <ShoppingCartRoundedIcon/> ADD TO CART </Link>                   
                                                    :  
                                                    <Link to ='#' className = 'product__Login'> 
                                                         Admin Can't Add products</Link>    
                                                        
                                                :
                                                <Link to ='/login' className =  'product__Login'>   
                                                       <AccountCircleRoundedIcon/> Login to order the product</Link>    
                                        }   
                                    </div>
                                </div>
                            )
                        })  
                    :  
                    <h4> Unable to Get the porduct details !! </h4>  
                }
                
            </div>     
            
            
         )
    }
}

const mapStateToProps =(state)=>{
    return {
        products:state.products,
        users:state.users
    }
}

export default connect(mapStateToProps)(ShowSingleProduct)