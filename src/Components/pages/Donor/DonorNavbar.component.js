import React, { Component } from 'react';
import styled from 'styled-components';

class Navbar extends Component {
    render() {
        return (
            <NavbarContainer>
                <nav className="navbar navbar-expand-sm  navbar-light px-2  py-0">
                    <img src="../../images/navBarLogoT.png" alt="logo" height="45px" width="45px" />
                    <a class="navbar-brand" href="/"> Blood Bank</a>
    
                       <ul className="navbar-nav ml-auto">
                            <li className="nav-item ">
                                <a className="nav-link" id="signin" href="/Donor">Donor</a>
                            </li>
                            <li className="nav-item">
                                
                                    <a className="nav-link"  href="/">Signout</a>
                            
                            </li>
                        </ul>             
                </nav>
            </NavbarContainer>
        )
    }
}
export default Navbar;

const NavbarContainer = styled.div`
background: #D13616;
.navbar-brand{
    color:#ffff !important;
    padding-left:1%;
    &:hover{
        background:#DA5338;
    }
}
li{
    display:inline-block;
    border-left:2px solid white; 
    padding:0.5px;
}

.nav-link{
    color:#ffff !important;
   
&:hover{
    background:#D6654E;
}
}


@media only screen and (max-width: 633px){
    img{
        left:0;
        height:30px;
        width:30px;
    }
    .navbar-brand{
     font-size:13px;      
    }
    .nav-item{
        padding-right:10px;
        font-size:12px;
        height:27px;
    }
    li{
        border-left:none;
        list-style:none;
        display:inline-block;
    }
}
`;