import React from 'react'
import {connect} from 'react-redux'  
import { updateProduct ,getProductsbyID} from '../../actions/productAction' 

class UpdateProduct extends React.Component{
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

        this.props.dispatch(getProductsbyID( this.props.match.params.id ))     
        const refersh =  setInterval( () =>{  
            if(this.props.products.length ) {             
                clearInterval(refersh)                  
                const products =   this.props.products[0] 
                this.setState({
                    name :products.name,
                    shortname : products.shortname,
                    description:products.description,
                    category : products.categoryID,
                    subcategory :products.subCategoryID,
                    price:products.price,
                    quantity:products.quantity,
                    mainImage:products.mainImage,
                    cartImage:products.cartImage
                })
            }
        } , 1000)
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

        const formData = {
            'name':this.state.name,
            'shortname':this.state.shortname, 
            'description': this.state.description,
            'price':this.state.price,
            'quantity':this.state.quantity,
            'categoryID':this.state.category,
            'subCategoryID':this.state.subcategory 
        }
         
        const redirect = () =>{
            return this.props.history.push('/products/list')             
        }


        this.props.dispatch(updateProduct(formData,this.props.match.params.id,redirect))
      
    }

    render(){  
        return( 
            <div className ='newProduct__container'>
                <form encType="multipart/form-data" className='newProduct_Infocontainer' onSubmit ={this.handleSubmit}  >  
                    <h3> Update Product </h3>                  
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
                                            <option key ={i+1} value ={item._id} 
                                            selected = {item._id === this.state.category ? true : false}  >{item.mainType}</option>
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
                                                    <option key ={j+1} value ={subtypes._id} 
                                                        selected = {this.state.subcategory === subtypes._id ?true :false}> {subtypes.name}</option>
                                                )
                                            })
                                        } 
                                        return ''
                                    })    
                                }
                            </select>
                        </div>
                                
                    </div>
                
                    <div className = 'newProduct__Desc'>
                        <label htmlFor='description' >Description :</label>
                        <textarea  id='description' required={true} name ='description'
                            className ='form-control' rows='8' placeholder ='Enter the description'                                   
                            value= {this.state.description.split('--').join('\n')}
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
 

                    <div className = 'newProduct__Submit'> 
                        <input type= 'submit' className ='addNewProduct' value = 'UPDATE PRODUCT' />  
                    </div>
                </form>
            
                <div className = 'newProduct_ReviewContainer'>
                    <div>
                    {
                        this.state.mainImage   ? 
                            <div>   
                                <h6> Main Image </h6>                              
                                <img src = { require(`../../upload/${this.state.mainImage}`) } alt='' className = 'newProduct_Review-Image'/> 
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
        products : state.products,
         categories :state.categories

    }
}
export default connect(mapStateToProps)(UpdateProduct)