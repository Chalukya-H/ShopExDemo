import React from 'react'

function Footer () {
    return( 
      <footer className="page-footer font-small mt-5 bg-dark text-light ">  
        <div className="container-fluid   text-center text-md-left"> 
          <div className="row">
            <div className="col-md-6 md-0 mt-3">
              <p className = 'text-warning' style ={{ fontSize:'18px'  }}>ShopEx</p>
              <p style ={{ fontSize:'14px' ,fontWeight:'normal' }} >This website is a Project developed using JavaScript,React JS ,NodeJS ,Express JS &amp; MongoDB.
                  <br/> This is a E-commerce shopping site like Flipkart where customer's can view the products and Order the liked one.
              </p> 
            </div> 

              <hr className="clearfix w-100 d-md-none pb-3" />
        
              <div className="col-md-3 mb-md-0 mb-3"> 
              </div> 

              <div className="col-md-3 mb-md-0 mt-3"> 
                <h4 style = {{ fontSize:'18px'  }}><u> Connect with me !</u></h4>

                <ul className="list-unstyled">
                  <li>
                  <span className='fas fa-envelope' style={{fontSize:'16px'}}>  </span> &nbsp;&nbsp;
                  <a href = "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=Chalukya001@gmail.com" 
                    target = '_blank' className = 'text-primary bg-dark'
                        style={{fontSize:'16px' }} >Chalukya001@gmail.com    </a> 
                  </li>
               
                  <li>
                    <span className = 'fa fa-git-square'  style={{fontSize:'16px'}}>  </span> &nbsp;&nbsp;
                    <a href="https://github.com/Chalukya-H" target="_blank"  className = 'text-primary bg-dark'
                        style={{fontSize:'16px' }}>Chalukya-H</a>
                  </li>
                  <li>
                  <span className = 'fa fa-linkedin-square '  style={{fontSize:'16px'}}>  </span> &nbsp;&nbsp;
                  <a href="https://www.linkedin.com/in/chalukya-h-77a0a8105/" target="_blank" 
                        className = 'text-primary bg-dark' style={{fontSize:'16px'  }}>Chalukya-H</a>
                  </li>
                </ul> 
              </div>

            </div> 
        </div> 
      </footer> 
   )
}

export default Footer