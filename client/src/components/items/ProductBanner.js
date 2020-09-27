import React from 'react'  
import {Link} from 'react-router-dom'
import image3 from '../../media/imageHeader/image9.png'
import ProductCard from './ProductCard' 
import {connect} from 'react-redux'
import {getTopProducts} from '../../actions/productAction'
import './ProductBanner.css'
 
class ProductBanner extends React.Component{
    constructor(){
        super()
        this.state = {
            isLoading : true
        }
    }
    componentDidMount = ()=>{
        this.props.dispatch(getTopProducts())   
        setTimeout( ()=>{ 
            if(this.props.products.length === 3){
                this.setState({isLoading : false})
            }
        } , 3000) 
       
    }

    render(){
       
        return(            
            <div className = 'productBanner'>
                <img className ='home__image' src = {image3}  alt ='Pic not found' />  
                {
                    this.props.products.length ?
                        <div className ='header__row row'>
                        {
                            this.props.products.map((products,i) =>{
                                return (
                                    <Link to = {`/products/${products._id}`} className ='product__link' key = {i+1} >
                                        <ProductCard  id = {products._id} className ='col-4'
                                            title =  {products.shortname} price = {products.price}
                                            image = {products.mainImage} />
                                    </Link>
                                   
                                )
                            })
                        }
                        
                        </div> 

                    : 
                    <div className="d-flex justify-content-center">   
                        {
                            this.state.isLoading === false ? 
                                <h2> There seems to be an issue. <br/> Please try after sometime. </h2>
                            :
                            <div>
                                    <span className ="spinner-grow text-danger  loadingSpinner" role="status"> </span>
                                <span className="  spinner-grow text-danger loadingSpinner" role="status"> </span>
                                <span className="  spinner-grow text-danger loadingSpinner" role="status"> </span>
                                <span className="  spinner-grow text-danger loadingSpinner" role="status"> </span>
                                <span className="  spinner-grow text-danger loadingSpinner" role="status"> </span>
                            </div>
                        }                   
                       
                    </div>
                }
                
            </div> 
           
        )
    }
}


const mapStateToProps =(state) =>{
    return {
        products :state.products 
    }
}

export default connect(mapStateToProps)(ProductBanner) 