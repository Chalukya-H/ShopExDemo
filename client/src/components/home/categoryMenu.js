import React from 'react'
import {connect} from 'react-redux'
import  {getCategories} from '../../actions/categoryAction'

class CategoryMenu extends React.Component {

    componentDidMount () {
        this.props.dispatch(getCategories())
    }
    
    render() {
        return(
            <div className ='container-fluid'>
                <div className ='row'>
                    <div className ='col-8'>                    
                        <nav className="navbar navbar-expand-lg ">
                            <div className = 'headerconcept collapse navbar-collapse'  >
                                <ul className="navbar-nav mr-auto">                    
                                        {
                                            this.props.categories ?
                                                this.props.categories.map((category,i) =>{
                                                return (                                      
                                                    <li className=" nav-item dropdown" key ={i+1}>   
                                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
                                                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style ={{color:'black'}}>
                                                                {category.mainType}
                                                        </a> 

                                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                                {
                                                                    category.subType.map( (sub,i) =>{                                                           
                                                                        return  (
                                                                            <a className="dropdown-item" href={`/products/query/${sub._id}`} key ={i+1}> 
                                                                                {sub.name} </a>
                                                                        )
                                                                    })
                                                                } 
                                                            </div>                      
                                                    </li> )
                                                })
                                            : ''
                                        }  
                                </ul> 
                            </div>
                        </nav>
                    </div> 
                </div>
            </div>
        )
       
    }
}

const mapStateToProps = (state) =>{
    return {
        categories : state.categories
    }
}
export default connect(mapStateToProps)(CategoryMenu)