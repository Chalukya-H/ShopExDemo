import React from 'react'
import MailIcon from '@material-ui/icons/Mail'; 
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './Footer.css'

function Footer () {
    return( 
      <div className ='footer__container'>
        <div className ='footer__info'>
            <a className = 'footer__appname' href ='/'>ShopEx</a>
            <p className ='footer__desc'>This website is a Project developed using JavaScript,React JS ,NodeJS ,Express JS &amp; MongoDB.
                <br/> This is a E-commerce shopping site like Flipkart where customer's can view the products and Order the liked one.
            </p> 
        </div>
        <div className="footer__links"> 
          <h4 style = {{ fontSize:'18px'  }}><u> Connect with me !</u></h4>
          <ul className="list-unstyled footer__socialMedia">
            <li> 
                <a href = "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=Chalukya001@gmail.com" className ='text-light'
                    target = '_blank' rel="noopener noreferrer" > 
                    <MailIcon className = 'footer__mail' ></MailIcon>
                </a>  
            </li>
          
            <li>                                     
                <a href="https://github.com/Chalukya-H" target="_blank" rel="noopener noreferrer" className ='text-light' > 
                    <GitHubIcon  className = 'footer__git'> </GitHubIcon> 
                </a>                       
            </li>
            <li> 
                <a href="https://www.linkedin.com/in/chalukya-h-77a0a8105/" target="_blank"  rel="noopener noreferrer" 
                    className ='text-light'>
                      <LinkedInIcon className = 'footer__linkedIn' ></LinkedInIcon>
                </a>                       
            </li>
          </ul> 
        </div>

      </div>  
      )
}

export default Footer