import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import  {getCategories} from '../../actions/categoryAction' 
import {startGetUser} from '../../actions/userAction'  
import {getProductsbyCategory} from '../../actions/productAction'
import './SidebarMenu.css'

class CategoryMenu extends React.Component{

    componentDidMount () {
        this.props.dispatch(getCategories())
        this.props.dispatch(startGetUser()) 
    }

    closeMenu = () =>{
        document.getElementById('sidebarMenu__container').style.width = '0'  
        document.getElementById('sidebarMenu__container').style.overflow = 'hidden'      
    }


    handleSubmit =(id) =>{ 

        const redirect = () =>{
            return this.props.history.push(`/products/query/${id}`)             
        }  
        this.props.dispatch(getProductsbyCategory(id,redirect)) 
        this.closeMenu()       
    }

     redirect = (id) =>{
        this.closeMenu()  
         this.props.history.push(`/products/query/${id}`)             
    }  

    render(){
        return(
            <div className ='sidebarMenu__container' id= 'sidebarMenu__container'>
               
                <ul  className = 'sidebarMenu'>                    
                    <ul>
                        <li className ='closeMenu'> 
                            <span className ='closeMenuIcon' onClick ={this.closeMenu}> &times; </span>
                        </li>
                        {
                            this.props.categories ?
                                this.props.categories.map((category,i) =>{
                                    return (    
                                        <li key ={i+1}>
                                            <p> <strong>{category.mainType} </strong> </p> 

                                            {
                                                category.subType.length ?
                                                    <ul>
                                                        {
                                                            category.subType.map( (subType,i) =>{
                                                                    return (
                                                                        <li key ={i+1}> 
                                                                            <p onClick ={()=>{ this.handleSubmit(subType._id) }}> 
                                                                             {subType.name}</p> 
                                                                         </li>
                                                                    )
                                                            })
                                                        } 
                                                    </ul>
                                                :''
                                            }
                                        </li>
                                    )
                                })
                            :''
                        }
                    </ul>
                    
                </ul>
            </div>
        )
    }
}



const mapStateToProps = (state) =>{
    return {
        categories : state.categories,
        users : state.users
    }
}
export default withRouter(connect(mapStateToProps)(CategoryMenu))