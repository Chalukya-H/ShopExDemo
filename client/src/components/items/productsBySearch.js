import React from 'react'  
import {getProductsbyQuery} from '../../actions/productAction'
import {connect} from 'react-redux' 
import ProductCard from './ProductCard'
import './Card.css'
import { Link } from 'react-router-dom'

class ProductSeachbyName extends React.Component {
    constructor(){
        super()
        this.state={
            products :[],
            path : window.location.origin   
        }
    }
    componentDidMount = ()=>{ 
        const text  = this.props.match.params.text.split('=')[1] 
        this.props.dispatch(getProductsbyQuery(text)) 
         
        const refersh =  setInterval( () =>{            
            if(this.props.products.length ){
                clearInterval(refersh)   
                this.setState({ products:this.props.products})                
            }
        },1000) 
    }

    
 
    render() { 
        return(         
            <div className ='productList_container'>
              {
                  this.state.products.length !== 0 ?
                    <div className ='productList_container row'>  
                        {
                            this.state.products.map((product,i) =>{  
                                return (
                                <Link to= {`/products/${product._id}`}  className ='product__link' key = {i+1} >
                                    <ProductCard image = {product.mainImage} 
                                        title = {product.shortname} price ={product.price}  />
                                </Link>
                                )
                            })
                        } 
                  </div> 
                  : 
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-danger m-5 " role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                
              }
 
            </div>
               
        )
    }
}

const mapStateToProps = (state) =>{
    return { 
        products:state.products
    }
}
export default connect(mapStateToProps)(ProductSeachbyName)