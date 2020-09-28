import React from 'react'
import NumberFormat from 'react-number-format' 
import {Link} from 'react-router-dom'
 import {getProducttoCart,deleteProducttoCart,updateCartQuantity} from '../../actions/cartAction'
import { connect } from 'react-redux'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {Helmet} from 'react-helmet'
import './Cart.css'

class Cart extends React.Component {

    constructor(){
        super()
        this.state={             
            path : window.location.origin ,
            price :0 ,
            tax : 0 
        }         
    }
    componentDidMount =()=>{
        this.props.dispatch(getProducttoCart())  
    }

    handleCartQuantity = (e , cart) =>{
        const valTYpe = e.target.name 

        if(valTYpe === 'less' && cart.quantity === 1 ) {           
            alert ('Item quantity can not be less than 1')
        } else if( cart.quantity >= 3 && valTYpe === 'add' ){
            alert('Upto 3 quantity only purchase at a time ')
        }

        const refresh =() =>{
            return window.location.reload()
        }

        if(valTYpe === 'less' &&  cart.quantity > 1 ) {
            const formData = {
                id : cart.productID,
                cartQuantity : -1,
                cartid : cart._id,
                productQuantity : 1,
                currentQuantity : cart.quantity,
                auth : localStorage.getItem('token')
            }
            
           
            this.props.dispatch(updateCartQuantity(formData,refresh))   

        } else if(valTYpe === 'add' &&  cart.quantity >=1 && cart.quantity < 3 ){
            const formData = {
                id : cart.productID,
                cartQuantity : 1,
                cartid : cart._id,
                productQuantity : -1,
                currentQuantity : cart.quantity,
                auth : localStorage.getItem('token')
            }
            this.props.dispatch(updateCartQuantity(formData,refresh))  
        }


    }

    handleRemove = (e) =>{
        const id = e.target.value
        
        const refresh =() =>{
            return window.location.reload()
        }
        this.props.dispatch(deleteProducttoCart(id ,refresh))

    }

    handlePriceDetails =() =>{
        if(this.props.cartData.length ) {             
                
            let price = 0
            this.props.cartData.map( cart =>{
                price += cart.price * cart.quantity
                return price  
            })   
            
            if (price > 0 ){
                const tax = price * 1 /100
                this.setState({price,tax})
            }
        }
    }
 
    render() {       
        return(
            <div className = 'cart__container' onLoad ={ this.handlePriceDetails} >
                <Helmet>
                    <title> ShopEx - Cart </title>
                </Helmet>
                <h4 style ={{ visibility : this.props.cartData.length ? 'visible' : 'hidden'}}>
                    My Cart ({ this.props.cartData.length}) </h4> 
                {
                   this.props.cartData.length ? 
                   <div className="cart__itemlist"> 
                        <div className = 'cart__mainList'> 
                        {
                            this.props.cartData.map( (cart,i) => {
                                return (
                                    <div className="cart__card"  key ={i+1}> 
                                        <div className ='cart__image'>                                        
                                            <img src={require(`../../upload/${cart.image}`)} className="cart__card-img" 
                                                alt="No Pic Found" />                                        
                                       </div> 
                                       <div className ='cart__info'>
                                           <h4>{cart.name} </h4>                                            
                                            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" 
                                                className="cart__price" displayType = 'text' prefix={`₹  `}
                                                 value={cart.price }/>
                                             <div className ='cart__qty'>
                                                <input type ='submit' className ='card-text border-white rounded-circle' name = 'less' 
                                                    onClick = { (e) => {this.handleCartQuantity (e,cart)} }  value = '-' />
                                                            
                                                <input type ='text' disabled value = {cart.quantity} 
                                                    className ='text-center w-25'/>
                                                    <input type ='submit' className ='card-text border-white rounded-circle'
                                                    name = 'add'  onClick = { (e) => {this.handleCartQuantity (e,cart)} }  value = '+' />
                                                    
                                            </div>    
                                        </div>  
                                        <div className ='cart__remove'>
                                            <button className="card-text float-right btn btn-danger" 
                                                value ={cart._id} onClick ={this.handleRemove} > Remove</button>   
                                        </div>                          
                                    </div>
                                ) 
                            })
                        }    
                        </div> 

                 
                        <div className="cart__PriceInfoCard card"  >
                            <div className="card-header">
                                <h5>PRICE DETAILS</h5>
                            </div>
                            <div className="card-body">
                                <div className ='row justify-content-between'>
                                    <h5 className="card-title float-left">{`Price (${this.props.cartData.length} items)`} </h5> 
                                    <h5 className="card-title float-right">
                                        <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" className="card-title float-right"
                                            displayType = 'text' prefix={'₹ '} value={this.state.price}/>
                                        </h5>
                                </div>
                                <div className ='row justify-content-between'>
                                    <h5 className="card-title float-left">TAX  </h5> 
                                    <h5 className="card-title float-right">
                                        <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" className="card-title float-right"
                                            displayType = 'text' prefix={'₹ '} value={ this.state.tax}/>
                                        </h5>
                                </div>
                                
                            </div>
                            <div className="card-footer">                                
                                <h5 className="card-title float-left">TOTAL PRICE </h5> 
                                <h5 className="card-title float-right">
                                        <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" className="card-title float-right"
                                            displayType = 'text' prefix={'₹ '} value={ this.state.price + this.state.tax}/>
                                        </h5>
                            </div>
                            
                                <Link to ='/orders/add' id='submit' name ='submit' className ='btn btn-danger ' > PLACE ORDER </Link>
                        </div>
                        
                    </div>                                                
                               
                :
                                                                        
                    <div className="cart__emptyContainer">                        
                            <h3> Your cart is empty !! </h3>
                            <Link to = '/' className ='btn cart__shopmore'>
                                <AddShoppingCartIcon className = 'cart__icon' /> Shop More </Link>
                        
                    </div> 
                }
 
            </div>
         )
    }
}

const mapStateTOProps = (state) =>{
    return{
        cartData:state.cartData,
        users : state.users
    }
}
export default connect(mapStateTOProps)(Cart)