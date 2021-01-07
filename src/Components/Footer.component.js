import React, { Component } from "react";
import styled from 'styled-components';

//<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"></link>

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <div className="mainFooter">
          <div className="container">
            <div className="row">
              <div className="col">
                <h4>ABOUT</h4>
                <ul className="list-unstyled">
                  <p className="about">
                    Blood Bank Management System enables different blood banks to manage their stocks
                    and donor and recievers to donate and recieve blood.
            </p>
                </ul>
              </div>
              <div className="col">
                <h4>CONTACT</h4>
                <ul className="list-unstyled">
                  <li><img src="../../images/home.png" alt="logo" height="25px" width="25px" /> Lahore</li>
                  <li><img className="call" src="../../images/call.png" alt="logo" height="25px" width="25px" /> 123-456789-09</li>
                </ul>
              </div>
              <div className="col">
                <h4>FOLLOW US</h4>
                <ul className="list-unstyled">
                  <li><img src="../../images/insta.png" alt="logo" height="25px" width="25px" /> www.insta.com</li>
                  <li><img className="call" src="../../images/twitter.png" alt="logo" height="25px" width="25px" /> www.twitter.com</li>
                </ul>
              </div>
            </div>

            <div class="hl">
            </div>
            <div className="row">
              <p className="col-sm">
                &copy;{new Date().getFullYear()} Blood Bank System | All Rights Reserved | Terms Of Service | Privacy
        </p>
            </div>

          </div>
        </div>
      </FooterContainer>
    )
  }
}
export default Footer;
// #A72509;
const FooterContainer = styled.div`
.mainFooter{
  color:white;
  background-color:#e02525;
  padding-top: 2em;
  bottom: 0;
  width:100%; 
  height:30%;  
  padding-left: 10em;
  margin-top:30%;
 
}
.hl{
 border-top:  solid #ffff;
 width:85%;}
.col-sm{
text-align: center;
 }
.about{
  font-size:12px;
}
.call{
  padding-top: 2px;  
}
`;