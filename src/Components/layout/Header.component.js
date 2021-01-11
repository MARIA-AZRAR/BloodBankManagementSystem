import React, { Component } from 'react';
import styled from 'styled-components';
class Header extends Component {
    render() {
        return (
            <MainContainer>
                <img class="img" src="../../images/navBarLogoT.png" alt="logo" height="90px" width="80px" />
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
.img{
    left:22%;
    transform:transalte(-50%,-50%);
    color:#fff;
    position:absolute;
    top:8%;
    z-index:2;}

@media only screen and (max-width: 1000px)  {
.img{   
    left:15%;
    height:80px;
    width:70px
    }
h1{
    left:27%;
    font-size:26px
    }
h5{
    top:18%;
    left:38%;
    font-size:18px ;
    font-weight:700
    }
    }
@media only screen and (max-width: 900px) {
.img{   
    left:15%;
    height:70px;
    width:60px
    }
h1{          
    left:26%;
    font-size:25px
    }
h5{
    top:15%;
    left:38%;
    font-size:18px ;
    font-weight:700
    }
    }  
@media only screen and (max-width: 720px) {
.img{   
    top:9%;
    left:15%;
    height:50px;
    width:40px
    }
h1{                                
    left:22%;
    font-size:20px
    }
h5{
    top:14%;
    left:27%;
    font-size:15px ;
    font-weight:700
    }
    }  
@media only screen and (max-width: 560px) {
.img{
    left:12%;
    }
    }

`;