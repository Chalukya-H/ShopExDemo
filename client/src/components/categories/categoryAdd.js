import React from 'react'
import {connect} from 'react-redux' 
import {Helmet} from 'react-helmet'
import {addCategories} from '../../actions/categoryAction'
import './AddCategory.css'

class CategoryAdd extends React.Component {
    constructor (){
        super()
        this.state ={
            mainCategory :'',
            subCategory:''
        }
    }

    handleChange =(e)=> {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit =(e) =>{
        e.preventDefault()
        const formData = {
            mainType : this.state.mainCategory ,
            subType : { name : this.state.subCategory}
        } 
 
        this.props.dispatch(addCategories(formData,'/categories/list'))
    }
    render(){
        return(
            <div className ='category__Addcontainer'> 
               <Helmet>
                    <title>ShopEx - Add Category</title>
                </Helmet>
                <h4> Add New Category  </h4>
                <div className ='row mt-2'>                                     
                    <div className ='col-md-6 mb-1'> Category :           
                        <input type="text"   className="form-control" placeholder ='like.. Electronics ,Books , Home Appliances'
                            name ='mainCategory'  value = {this.state.mainCategory} onChange ={this.handleChange} />  
                    </div>                            
                </div> 
                <div className ='row mt-3'>                                     
                    <div className ='col-md-6'>  Sub Category :                  
                        <input type="text"  className="form-control" placeholder ='like.. Mobiles ,Laptop'
                        name ='subCategory'  value = {this.state.subCategory} onChange ={this.handleChange}  />  
                    </div>                          
                </div> 
                    
                <div className ='row mt-4'>
                    <div className ='col-md-4'>                    
                    <button type="button" className="btn btn-primary w-50" onClick={this.handleSubmit}>
                        Add
                        </button> 
                    </div>
                </div> 
            </div>
        )
    }
}
 
export default connect()(CategoryAdd)