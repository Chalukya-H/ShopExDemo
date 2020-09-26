import React from 'react'
import MailIcon from '@material-ui/icons/Mail'; 
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './Footer.css'

function Footer () {
    return( 
      <footer className="page-footer font-small mt-5 bg-dark text-light ">  
        <div className="container-fluid text-center text-md-left m-0"> 
          <div className="row">
            <div className="col-md-6 md-0 mt-3">
              <a className = 'text-warning footer__appname' href ='/'>ShopEx</a>
              <p style ={{ fontSize:'14px' ,fontWeight:'normal' }} >This website is a Project developed using JavaScript,React JS ,NodeJS ,Express JS &amp; MongoDB.
                  <br/> This is a E-commerce shopping site like Flipkart where customer's can view the products and Order the liked one.
              </p> 
            </div> 

              <hr className="clearfix w-100 d-md-none pb-3" />
        
              <div className="col-md-3 mb-md-0 "> 
              </div> 

              <div className="col mt-4 footer__links"> 
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
        </div> 
      </footer> 
   )
}

export default Footer