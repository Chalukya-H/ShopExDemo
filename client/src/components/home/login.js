import React from 'react'  
import {connect} from 'react-redux' 
import Register from './register'
import logo from '../../media/Logo-1.PNG'
import {stratLogin} from '../../actions/userAction'
import {Link} from 'react-router-dom'
import './Login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password :''
        }
    }
 
    handleChange =(e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit =(e) =>{
        e.preventDefault()
        const userData = {
            email : this.state.email,
            password : this.state.password
        }

        const redirect = () =>{
            return this.props.history.push('/ShopEx')             
        }

        

        const refresh =() =>{
            return window.location.reload()
        }

        this.props.dispatch(stratLogin(userData,redirect,refresh))        
    }

    handleSwap = (e)=>{
        const container = document.getElementById('container');
        if (e.target.id === 'signUp'){           
            container.classList.add("right-panel-active");
        } else{
             
            container.classList.remove("right-panel-active");
        }
        
    }

    render() {
        return(
            <div className="login__container" id="container">
                
                <Register/>
                <div className="form-container sign-in-container">
                    <form onSubmit = {this.handleSubmit} className ='form_Signin'>
                        <h1>Sign in</h1>                         
                        <span>or use your account</span>
                        <input type="email" required={true} name ='email'  placeholder="Email" className ='login__email'
                            value ={ this.state.email} onChange ={this.handleChange} />
                        <input type="password" placeholder="Password" className ='login__password' id='password' required={true} name ='password' 
                        value ={ this.state.password} onChange ={this.handleChange} />                         
                        <button className ='login__signIn' id='signin' name ='signin' >Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <Link to ='/'>
                                <img className = 'header__logo' src = {logo} alt =''/> 
                            </Link>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button   id="signIn" className ='login__ghostsignIn'  onClick ={this.handleSwap}>Sign In</button>
                        </div>
                        <div className ="overlay-panel overlay-right">
                            <Link to ='/'>
                                <img className = 'header__logo' src = {logo} alt =''/> 
                            </Link>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button   id="signUp"  className ='login__ghostsignUp' onClick ={this.handleSwap}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

         )
    }
}

export default connect()(Login)