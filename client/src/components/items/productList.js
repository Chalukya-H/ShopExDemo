import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../../actions/productAction'
import {getCategories} from '../../actions/categoryAction'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import './ProductList.css'

class ProductsSummary extends React.Component {

    componentDidMount = ()=>{
        this.props.dispatch(getProducts()) 
        this.props.dispatch(getCategories()) 
    }

    render() {
        return(
            <div className ='productList__container'>
                <Helmet>
                    <title> ShopEx - Product-Summary </title>
                </Helmet>
                <div className="row justify-content-start">
                    <div className="col-3">
                        <h3> Products Summary </h3>
                    </div>
                    <div className="col-4">
                        <Link to ='/products/add' className ='btn btn-info'> Add products</Link>
                    </div>
                </div>
                 
               
                <table className="table table-striped table-dark table-bordered ">
                    <caption className ='align-text-top'>List of {this.props.products.length} products</caption>
                    <thead className ='bg-success'>
                        <tr>
                            <th scope="col">Sl.no</th>
                            <th scope="col">Product ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>  
                            <th scope="col">Sub Category</th>    
                            <th scope="col">Stock Avilable</th>   
                            <th scope="col">Update</th>                           
                        </tr>
                    </thead>
                    <tbody>

                        {
                            this.props.products.map((product,i) =>{
                                return(
                                    <tr key = {i+1}>
                                        <th scope="row">{i+1}</th>
                                        <td >{product._id}</td>
                                        <td className ='align-self-center'>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            { this.props.categories.map(category =>{                                                 
                                                    return ( category._id === product.categoryID ? category.mainType : '')
                                                })
                                            }</td>
                                            <td>
                                            { this.props.categories.map(category =>{
                                                    return category.subType.map(subtype =>{
                                                        return ( subtype._id === product.subCategoryID ? subtype.name : '')
                                                    })
                                                })
                                            }</td>
                                        <td>{product.quantity}</td> 
                                        <td>  <Link to = { `/products/update/${product._id}`} className ='btn btn-info btn-sm'> UPDATE 
                                            </Link> </td>                                           
                                    </tr>
                                )
                            })
                        }
                      
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps =(state) =>{
    return {
        products :state.products,
        categories:state.categories
    }
}

export default connect(mapStateToProps)(ProductsSummary)