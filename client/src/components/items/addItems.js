import React from 'react'
import {connect} from 'react-redux' 
import {getCategories} from '../../actions/categoryAction'
import { addProduct } from '../../actions/productAction' 
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import {withRouter} from 'react-router-dom'
import './AddProduct.css'

class AddProduct extends React.Component{
    constructor(){
        super()
        this.state = {
            name:'',
            shortname:'',
            description:'',
            category : '',
            subcategory :'',
            price:'',
            quantity:'',
            mainImage:'',
            cartImage:'',
            reviewmainImage:'',
            reviewcartImage:''             
        }
    }

    componentDidMount() {
        if (this.props.categories.length === 0) {
            this.props.dispatch(getCategories())            
        }  
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleImage =(e) =>{
        const filepath = e.target.files[0]        
        this.setState({
            [e.target.name]:filepath
        })
         
        //Image Review
         const events = [e.target.id]          
        const reader = new FileReader()
        reader.addEventListener("load",( )=>{                    
            this.setState({ [events]:reader.result})
        },false)
        reader.readAsDataURL(filepath)
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('name',this.state.name)
        formData.append('shortname',this.state.shortname)
        formData.append('description',this.state.description)
        formData.append('price',this.state.price)
        formData.append('quantity',this.state.quantity)
        formData.append('categoryID',this.state.category)
        formData.append('subCategoryID',this.state.subcategory)
        formData.append('mainImage',this.state.mainImage)
        formData.append('cartImage',this.state.cartImage)
         
        const redirect = () =>{
            return this.props.history.push('/products/list')  
           
        }
        const refresh =() =>{
            return window.location.reload()
        }

        this.props.dispatch(addProduct(formData,redirect))
      
    }

    render(){ 

        return(
            <div className ='newProduct__container'>
                <form encType="multipart/form-data" className='newProduct_Infocontainer' onSubmit ={this.handleSubmit}  >  
                    <h3> Add Product</h3>                  
                    <div className ='newProduct__namesContainer'>
                        <label htmlFor='name' >Product Name :</label>
                        <input type= 'text'id='name' required={true} name ='name' className ='newProduct__fullName' 
                            placeholder ='Enter the Product Detailed Name' value ={this.state.name} onChange ={this.handleChange}  />

                        <label htmlFor='shortname' >Product Short Name :</label>
                        <input type= 'text'id='shortname' required={true} name ='shortname' className ='newProduct__shortName' 
                            placeholder ='Enter the Product Short Name' value ={this.state.shortname} onChange ={this.handleChange}  />
                    </div>

                    <div className ='newProduct__Category'>
                        <div className ='newProduct__mainCategory'>
                            <label htmlFor='category'> Category:</label>     
                            <select className="form-control" name = 'category'  id ='category' onChange ={this.handleChange}>        
                                <option>----Select Category----</option>                               
                                {
                                    this.props.categories.map ((item,i)=>{
                                        return(
                                            <option key ={i+1} value ={item._id}  >{item.mainType}</option>
                                        )
                                    })    
                                }
                            </select> 

                        </div>
                        <div className = 'newProduct__subCategory'>
                            <label htmlFor='subcategory' > Sub Category:</label> 
                            <select className="form-control" name ='subcategory' id='subcategory' onChange = {this.handleChange}>  
                                <option>----Select Sub Category-----</option>                                      
                                {
                                    this.props.categories.map ((item)=> {                                           
                                        
                                        if(item.subType.length===0 && item._id === this.state.category)
                                        {
                                            return (
                                                <option key ='1' value ={'NA'}> Others </option>
                                            )
                                        }
                                        else if(  item._id === this.state.category){
                                            return item.subType.map((subtypes,j)=>{                                                        
                                                return(
                                                    <option key ={j+1} value ={subtypes._id} > {subtypes.name}</option>
                                                )
                                            })
                                        } 
                                    })    
                                }
                            </select>
                        </div>
                                
                    </div>
                
                    <div className = 'newProduct__Desc'>
                        <label htmlFor='description' >Description :</label>
                        <textarea  id='description' required={true} name ='description'
                                className ='form-control' rows='8' placeholder ='Enter the description' value ={this.state.description}
                                onChange ={this.handleChange}   />
                    </div>
                                                    
                    <div className = 'newProduct__price'>
                        <div className = 'newProduct__priceinfo'>
                            <label htmlFor='price' >Price :</label> 
                            <div className="input-group-prepend">
                                <span className="input-group-text fa fa-rupee" id="basic-addon"></span>
                                <input type= 'text' id='price' required={true} name ='price' className ='newProduct__priceText' 
                                    placeholder ='Enter the Product price' value ={this.state.price} onChange ={this.handleChange}  /> 
                            </div>   
                        </div>
                        <div className = 'newProduct__quantity'>
                            <label htmlFor='quantity' >Quantity :</label>
                            <input type= 'text' id='quantity' required={true} name ='quantity' className ='form-control' 
                                placeholder ='Enter quantity' value ={this.state.quantity} onChange ={this.handleChange}  />  
                        </div>
                    </div>

                    <div className="newProduct__Imageinfo">
                        <input type="file"  id="reviewmainImage" name = 'mainImage' className ='Newproduct_Image'
                            onChange ={this.handleImage} required= {true}    />
                        <label htmlFor ='reviewmainImage' className ='Newproduct_Imagelabel'>
                            <AddPhotoAlternateIcon/> Choose the Main Image</label>
                        {
                              this.state.mainImage === '' && this.state.name !== ''  ? 
                                <label className ='ImageWarning'> Product Image is blank</label>
                               :  ''
                            //    <label className ='ImageWarning!'> {this.state.mainImage.name}</label> 
                        }
                     </div>

                    <div className="newProduct__Imageinfo">
                        <input type="file"  id="reviewcartImage" name = 'cartImage' className ='Newproduct_Image'
                            onChange ={this.handleImage} required= {true}    />
                        <label htmlFor ='reviewcartImage' className ='Newproduct_Imagelabel'>
                            <AddPhotoAlternateIcon/> Choose the Cart Image</label>
                        {
                              this.state.cartImage === '' && this.state.name !== '' ? 
                                <label className ='ImageWarning'> Product Image is blank</label>
                               :  ''
                            //    <label className ='ImageWarning!'> {this.state.mainImage.name}</label> 
                        } 
                    </div>

                    <div className = 'newProduct__Submit'> 
                        <input type= 'submit' className ='addNewProduct' value = 'ADD PRODUCT' />  
                    </div>
                </form>
            
                <div className = 'newProduct_ReviewContainer'>
                    <div>
                        {
                            this.state.mainImage   ? 
                                <div>   
                                    <h6> Main Image </h6>                              
                                    <img src = {this.state.reviewmainImage} alt='' className = 'newProduct_Review-Image'/> 
                                </div>
                            :'' 
                        }
                    </div>
                    <div>
                        {
                            this.state.cartImage ? 
                                <div style ={{margin :'30px'}}>
                                    <h6> Cart Image </h6>
                                    <img src = {this.state.reviewcartImage} alt='' className = 'newProduct_Review-CartImage'/> 
                                </div>
                            :'' 
                        }
                    </div>                    
                </div>
            </div>  
        )
    }
}


const mapStateToProps =(state) =>{
    return{
        categories : state.categories
    }
}
export default withRouter(connect(mapStateToProps)(AddProduct))