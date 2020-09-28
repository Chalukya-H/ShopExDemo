import React from 'react' 
import {startRegister} from '../../actions/userAction'
import {connect} from 'react-redux' 
import './Login.css'

class Register extends React.Component {
    constructor(){
        super()
        this.state ={
            firstName : '',
            lastName :'',
            email:'',
            password:'',
            confirmPwd :'',
            pwdMsg:''
        }
    }

    handleChange = (e) =>{
        this.setState ({
            [e.target.name] : e.target.value
        })
    }


    handleSubmit =(e) =>{
        e.preventDefault()

          
        const refresh =() =>{
            return window.location.reload()
        }   

        if(this.state.password === this.state.confirmPwd){
             const userData = {
                firstName: this.state.firstName,
                lastName : this.state.lastName ,
                email: this.state.email,
                password:this.state.password
             }
             
             this.props.dispatch(startRegister(userData,refresh ))
        } 
        else{
            this.setState({pwdMsg:'Password not matched',confirmPwd:''})
            
        } 

    }

    render() {
        return(
            <div className="form-container sign-up-container">               
                <form onSubmit ={this.handleSubmit} className ='form_Signup'>
                    <h1>Create Account</h1>     <span></span>
                    <input type="text" placeholder="First Name"  className ='register__fnname' id='firstName' required={true} 
                    name ='firstName' value ={this.state.firstName} onChange ={this.handleChange}/>

                    <input type="text" placeholder="Last Name"  className ='register__lnname' id='lastName' required={true} 
                    name ='lastName' value ={this.state.lastName} onChange ={this.handleChange} />

                    <input type="email" placeholder="Email"  className ='register__email' id='email' required={true} name ='email'
                        value ={this.state.email} onChange ={this.handleChange} />

                    <input type="password" placeholder="Password" className ='register__password' id='register_password' required={true} name ='password'
                        value ={this.state.password} onChange ={this.handleChange}  />

                    <input type="password" placeholder="Confirm Password"  className ='register__Cpassword' id='confirmPwd' required={true} name ='confirmPwd'
                        value ={this.state.confirmPwd} onChange ={this.handleChange} />
                        <span style ={{color:'red'}}>
                            {this.state.pwdMsg}
                        </span>
                    <button className ='login__signUp' >Sign Up</button>
                </form>
            </div>
         )
    }
}


export default connect () (Register)