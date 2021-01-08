import React, { Component } from 'react';
import styled from 'styled-components';

class Navbar extends Component {
    render() {
        return (
            <NavbarContainer>
                <nav className="navbar navbar-expand-lg navbar-light px-5 py-0">
                    <img src="../../images/navBarLogoT.png" alt="logo" height="45px" width="45px" />
                    <a class="navbar-brand" href="/"> Home</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/signin">SignIn<span class="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <div class="vl">
                                    <a className="nav-link" href="/signup">Join Now </a>
                                </div>
                            </li>
                        </ul>
                    </div>
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
.nav-link{
    color:#ffff !important;
   
&:hover{
    background:#D6654E;
}
}
.vl{
 border-left: thick solid #ffff;
height:35px;}
}
`;