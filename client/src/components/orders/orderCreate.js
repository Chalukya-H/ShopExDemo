import React from 'react'
import {getProducttoCart} from '../../actions/cartAction'
import {addProductstoOrder} from '../../actions/orderAction'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format' 
import {Link } from 'react-router-dom' 
import './OrderCreate.css'

class OrderCreate extends React.Component {
    constructor(){
        super()
        this.state={    
            address: '',
            contactNum:'',
            readyToOrder : false,
            price:0,
            tax:0
        }
    }
    componentDidMount =()=>{ 
        this.props.dispatch(getProducttoCart()) 
        setTimeout( () =>{
            this.handlePriceDetails()
            this.handleAddressInfo()
        },2000)
        
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

        if(this.props.users.length) {
            this.setState({
                address : this.props.users[0].address ,
                contactNum : this.props.users[0].mobile
            })

             
        }  
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) =>{
       
        this.setState({
            readyToOrder : true
        })
    }

    handleInfoEdit = (e) =>{
        this.setState({
            readyToOrder : false
        })
    }

    handleOrders = (e) =>{
        const refresh =() =>{
            return window.location.reload()
        }
        const orders = this.props.cartData.map(cart =>{
            return {
                name:  cart.name,
                price : cart.price,
                quantity:cart.quantity,
                image: cart.image,
                customerID: this.props.users[0]._id,
                address: this.state.address,
                contactNum: this.state.contactNum
            }
        })
        
        this.props.dispatch(addProductstoOrder(orders,refresh))
    }

    handleAddressInfo = (e) =>{        
        if(this.props.users.length) { 
            if( this.props.users[0].address !== ''  && this.props.users[0].mobile !== '' )
            {   
                this.setState({ readyToOrder : true })
            }
        }

    }

    render(){          
        return (           
            <div className ='preOrder__container'>
                <h4  hidden = { this.state.readyToOrder && this.props.cartData.length ? false : true}  > Confirm Your Order! 
                    <a href= '#' className="text-monospace text-decoration-none order__edit" onClick ={this.handleInfoEdit} 
                       hidden = { this.state.readyToOrder && this.props.cartData.length ? false : true} >Edit</a>
                 </h4> 
               
                <div className ='product__deliveryAddress'  
                    hidden = { this.state.readyToOrder && this.props.cartData.length ? false : true} >                     
                     <h6 className = 'product__address'> Delivery Address : </h6> <p> {this.state.address} </p> 
                </div>
                <div className ='product__deliveryCellNum'  
                    hidden = { this.state.readyToOrder && this.props.cartData.length ? false : true} >   
                     <h6 className = 'product__address'>Mobile Num :</h6> <p>  {this.state.contactNum} </p>    
                </div>
                
                {
                   this.props.cartData.length && this.state.readyToOrder === true? 
                   <div className="cart__itemlist"> 
                        <div className = 'cart__mainList'> 
                        {
                            this.props.cartData.map( (cart,i) => {
                                return (
                                    <div className="cart__card"  key ={i+1}> 
                                        <div className ='cart__image'>                                        
                                            <img src={require(`../../upload/${cart.image}`)} className="cart__card-img" 
                                                alt="No Image" />                                        
                                       </div> 
                                       <div className ='cart__info'>
                                           <h4>{cart.name} </h4>  
                                           <div className ='order__priceInfo'>
                                                <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" 
                                                    className="order__price" displayType = 'text' prefix={`₹  `}
                                                    value={cart.price }/>
                                                <h6 className="order__price">Quantity  - {cart.quantity} </h6> 
                                            </div>                                          
                                               
                                        </div>  
                                                                  
                                    </div>
                                ) 
                            })
                        }    
                        </div> 

                 
                        <div className="cart__PriceInfoCard card"   >
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
                            <Link to ='/orders/summary'  className ='btn btn-danger ' 
                                value ='CONFIRM ORDER'  onClick = {this.handleOrders} >CONFIRM ORDER</Link>
                        </div>
                        
                    </div>                                                
                               
                :
                 
                     this.props.cartData.length ?
                        <div className ='order__adressContainer'>
                            <h3> Add delivery details: </h3>
                            <div className='row mt-4'>
                                <div className ='col-md-5 '>
                                    <form   encType="multipart/form-data" onSubmit ={this.handleSubmit} >                              
                                        <div className = 'form-group'>
                                            <label htmlFor='address' >Delivery Address:</label>
                                            <textarea  id='address' required={true} name ='address'
                                            className ='form-control h-40' rows='5'  
                                            placeholder ='Enter the address' value ={this.state.address}
                                            onChange ={this.handleChange}   />
                                        </div>
                                        
                                        <div className = 'form-group'> 
                                        <label htmlFor='contactNum' >Mobile Number:  </label>                   
                                            <div className="input-group mb-3">                                        
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">+91</span>
                                                </div>
                                                
                                                <input type="text" className="form-control" placeholder="Mobile Number" id= 'contactNum' 
                                                required = {true}  name= 'contactNum' value = {this.state.contactNum} onChange ={this.handleChange} />
                                            </div>
                                        </div>
                                        <input type ='submit' className ='btn btn-primary' value ='ADD DETAILS' />
                                    </form>
                                </div>
                            </div>
                        </div> 
                     :                                                   
                     <div className ='order__adressContainer'>
                         <h2> Nothing Left to Order! </h2>
                    </div>
                }
 
            </div>
        )
    }
} 

const mapStateTOProps = (state) =>{
    return{
        cartData: state.cartData,
        users : state.users
    }
}
export default connect(mapStateTOProps)(OrderCreate)
 