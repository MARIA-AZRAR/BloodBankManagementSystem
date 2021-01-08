import React, { Component } from 'react';
import styled from 'styled-components';
class Header extends Component {
    render() {
        return (
            <MainContainer>
                <img src="../../images/navBarLogoT.png" alt="logo" height="90px" width="80px" />
                <h1> Blood Bank Management System<br /></h1>
                <h5>Donate Blood Save Lives!</h5>
            </MainContainer>

        )
    }
}
export default Header;

const MainContainer = styled.header`
background:url(../../images/header.jpg) no-repeat center/cover;
height:10rem;
h1{
    transform:transalte(-50%,-50%);
    color:#fff;
    font-weight:900;
    position:absolute;
    top:10%;
    left:30%;
}
h5{
    transform:transalte(-50%,-50%);
    color:#fff;
    font-weight:900;
    position:absolute;
    top:18%;
    left:43%;
}
img{
    transform:transalte(-30%,-30%);
    color:#fff;
    position:absolute;
    top:8%;
    left:23%;
    z-index:2;
`;