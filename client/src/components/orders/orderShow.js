import React from 'react'
import {getOrdersDetails} from '../../actions/orderAction'
import { connect } from 'react-redux' 
import './OrderShow.css'

class OrdersDisplay extends React.Component{
    constructor(){
        super()
        this.state={       
            date : new Date()
        }
    }
    componentDidMount =()=>{
        this.props.dispatch(getOrdersDetails())         
    }

    handleExpand (i) {
        const order_container = document.getElementsByClassName('order_summary__containerbox'); 
        order_container[i].classList.toggle('active') //Add 'active' to class name
    }

    render(){
         
        return(
            <div className = 'order_summary__container'>
                <div hidden = {this.props.orders.length ? false : true}>
                    <h2>Your Orders !</h2>
                </div>
                {
                    this.props.orders.length ?
                        this.props.orders.map( (order,i) =>{
                            return (
                                <div className ='order_summary__containerbox' key ={i+1} onClick ={ () =>{ this.handleExpand(i) } }>                                    
                                    <div className = 'order_summary__label'>
                                         {order.name} 
                                    </div>
                                    <div className ='order_summary__content'>
                                         
                                        <img src={require(`../../upload/${order.image}`)} className="order_card-img" 
                                                alt="Pic Not found" /> 
                                        <div className ='order_summary__Info'>
                                            <h6> Price : {order.price * order.quantity}  </h6>
                                            <h6> Quantity : {order.quantity}   </h6>  
                                            <h6> Address : {order.address} </h6>
                                            <h6> Contact : {order.contactNum} </h6>
                                            <h6> Delivery Date :  { order.deliveredAt.substr(0,10) } </h6>
                                        </div>  
                                    </div>
                                 </div>    
                            )
                        })
                    :
                    <div className="order__emptyContainer">                        
                        <h3> No Orders Found !! </h3>
                    </div>
                }
 
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        orders : state.orders
    }
}

export default connect(mapStateToProps)(OrdersDisplay)