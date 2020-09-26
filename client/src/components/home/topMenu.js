import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../media/Logo-1.PNG' 
import {startGetUser} from '../../actions/userAction'  
import {connect} from 'react-redux'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import AfterLoginMenu from './AfterLoginMenu'
import './Topmenu.css'
import './LoginMenu.css'

class TopMenu extends React.Component{
    constructor(){
        super()
        this.state ={           
            searchText:''
        }
    }

    componentDidMount =()=>{
        this.props.dispatch(startGetUser()) 
       
    }


      handleSearch =(e) =>{
          this.setState ({searchText : e.target.value})
      }

     handleSubmitSearch = (e) =>{
        window.location.href = `/search/q=${this.state.searchText}`
     }

    render() {
         
        return (
           <nav className ='header'>
                <Link to ='/'>
                    <img className = 'header__logo' src = {logo} alt =''/> 
                </Link>

                <div className ='header__seach'>
                    <input type ='text' className ='header__searchInput' id ='searchbar'
                        placeholder="Search by product name"   value ={this.state.searchText}  
                        onChange = {this.handleSearch} />
                        <SearchIcon className ='header__seachIcon' onClick ={this.handleSubmitSearch} />
                </div>
                    {
                         localStorage.getItem('token') !== '' &&   localStorage.getItem('token') !== null ?  
                            <AfterLoginMenu userData = {this.props.users}/>

                        :
                        <div className ='headerNav'>                   
                            <Link to ='/login' className ='header__link'> 
                                <div  className ='header__option'>  
                                    <AccountCircleIcon className ='header__account' />                      
                                </div>                                             
                            </Link>
                        
                        </div>
                    }               
               


               
           </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return  {
        users : state.users
    }
}

export default connect(mapStateToProps)(TopMenu)