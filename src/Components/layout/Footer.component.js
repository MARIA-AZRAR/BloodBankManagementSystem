import React, { Component } from "react";
import styled from 'styled-components';
import logo from '../../img/logosd.png';
//<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"></link>

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <footer>
          <div className="container-fluid padding">
            <div className="row text-center">
              <div className="col-md-4">
                <img src={logo}/>
                <hr className="light" />
                <h5>About</h5>
                <hr className="light" />
                <p> Blood Bank Management System enables different blood banks to manage their stocks
			and donor and recievers to donate and recieve blood.</p>

              </div>
              <div className="col-md-4">
                <hr className="light" />
                <h5>Contact Us</h5>
                <hr className="light" />
                <p>123-456789-09</p>
                <p>555 555 555</p>
                <p>27th Avenue , Lahore</p>
              </div>
              <div className="col-md-4">
                <hr className="light" />
                <h5>Connect</h5>
                <hr className="light" />
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-youtube"></i>
              </div>
              <div className="col-12">
                <hr className="light-100" />
                <h6>&copy;{new Date().getFullYear()} Blood Bank System | All Rights Reserved | Terms Of Service | Privacy</h6>
              </div>
            </div>
          </div>
        </footer>
      </FooterContainer >
    )
  }
}

//



export default Footer;
// #A72509;
const FooterContainer = styled.div`

.fa-facebook {
color: #3b5998;
}

.fa-twitter {
color: #00aced;
}

.fa-instagram {
color: #517fa8;
}
.fa-youtube {
color: #bb0000;
}

.fa-youtube:hover, 
.fa-instagram:hover ,
.fa-twitter:hover, 
.fa-facebook:hover {
color: #d5d5d5;
}

footer {
background-color:#e02525;
color: #ffffff;
bottom: 0;
width:100%;
padding-top: 2em;
margin-top:2%;
}

hr.light {
border-top: 1px solid #d5d5d5;
width: 75%;
margin-top:  .8rem;
margin-bottom: 1rem;
}

footer i {
padding:.5rem;
color: #d5d5d5;
}

hr.light-100{
border-top: 1px solid #d5d5d5;
width: 100%;
margin-top:  .8rem;
margin-bottom: 1rem;
}

`;