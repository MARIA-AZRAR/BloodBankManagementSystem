import React, { Component } from 'react';
import styled from 'styled-components';



const Vision = () => {

    return (
        <VisionContainer>
        
        <div class="about">
        <div class="row">
        <div class="about-content-left">
            
        <h2 class="welcome-text">Our Vision</h2>
        <p>The Blood Bank Management System aims to serve for
             human welfare. The Blood Bank Management System is 
             designed to provide the platform where donors donate 
             blood, patient receive blood and blood banks manage 
             their stocks. This system is used by several blood banks and 
             hospitals to manage their blood stocks and routine blood transfusion.
            Moreover our vision is to provide
               transparency in making the process of obtaining blood from a blood bank hassle free and corruption free and make the system of blood bank management effective.</p>
        </div>
        <div class="about-content-right"> 
        <h4>"Donate your blood for a reason, let the reason to be life"</h4>
        
    
        {/* <p>Provides transparency in this field, make the process of obtaining blood from a blood bank hassle free and corruption free and make the system of blood bank management effective.</p> <span><a href="/" target="_blank">more info</a></span> */}
        </div>
        </div>
        </div>
        
        </VisionContainer>
    );

}

export default Vision;
const VisionContainer = styled.div`

.container {
    padding-top: 5cm;
    padding-bottom: 5cm;
    padding-left: 15px;
    padding-right: 15px;
}
div {
    display: block;
}
.row {
    margin-left: -15px;
    margin-right: -15px;
}
.widget-item-about .about-content-left {
    width: 560px;
    float: left;
    display: block;
    margin-top: 30px;
    font-size: 15px;
    padding-right: 100px;
    padding-top:30px;
}
.welcome-text {
    margin: 70px 0 20px;
    font-weight: bold;
    font-size: 30px;
    text-align:center;
    color:#8B0000;
}
p {
    font-size: 20px;
    margin: 15px 0 10px;
    padding-right: 100px;
    padding-left: 100px;
}

.about-content-right{
    margin-top:50px;
    text-align:center;
    font-style:italic;
    color:	#8B0000;
}
.widget-item-about .about-content-right {
    width: 450px;
    text-align:center;
    /* float: right; */
    display: block;
    border: 1px solid #f4f4f4;
    height: auto;
    // background: #f4f4f4;
    padding: 20px 30px;
    margin-top: 90px;
    font-size: 15px;
    text-align: center;
    padding-top: 50px;
}

`;