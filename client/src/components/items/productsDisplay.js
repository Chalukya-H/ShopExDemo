import React from 'react'  
import {Link} from 'react-router-dom'  
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import './Card.css'

class  ProductShowByCategory extends React.Component {
    constructor(){
        super()
        this.state = {
            isLoading : true
        }
    }
    componentDidMount = ()=>{ 
        setTimeout( ()=>{ 
            if(this.props.products.length === 0){
                this.setState({isLoading : false})
            }
        } , 3000) 
       
    }

    render() {          
        return(         
            <div className ='productList_container'>
              {
                  this.props.products.length !== 0 ?
                    <div className ='productList_container row'>  
                        {
                            this.props.products.map((product,i) =>{  
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
                  <div className="d-flex justify-content-center product__loading">
                    {
                        this.state.isLoading === false ? 
                            <h2 className ='msg_NoProductFound'> No Product Found ! <br/> Please search some other products. </h2>
                        :
                        <div className="spinner-border text-danger m-5 " role="status">
                            <span className="sr-only">Loading...</span>                        
                        </div> 
                    }                   
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
export default connect(mapStateToProps)(ProductShowByCategory)