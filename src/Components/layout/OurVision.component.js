import React from 'react';
import styled from 'styled-components';

const AboutUs = () => {
    return (
        <VisionContainer>
                <div class="container about">
                    <div class="about-content-left">
                        <h2 class="welcome-text">Our Vision</h2>
                        <p>This Blood Bank Management System aims to serve for human welfare.
                        The Blood Bank Management System is designed to provide the
                        and blood banks manage their stocks.
                        This system is used by blood banks and hospitals to manage
                        their blood stocks and routine blood transfusion.
                        Moreover, this Blood Bank Management System (BBMS)
                        highly aims to provide transparency in making the process of
         obtaining blood from a blood bank hassle free and corruption free and make the system of blood bank management effective.</p>
                    </div>
                    <div class="about-content-right">
                        <h4>“Donate your blood for a reason, let the reason to be life”</h4>
                        <br />
                    </div>
                </div>
        </VisionContainer>
    );

}

export default AboutUs;

/**
 * import pattern from '../../img/pattern.jpg'

 *             <div class="background" style={{ backgroundImage: `url(${pattern})` }}>
 * .background{
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
}

 */
const VisionContainer = styled.div`


.container {
    padding-top: 2%;
    padding-bottom: 5cm;
    /* margin-right: auto;
    margin-left: auto; */
    padding-left: 15px;
    padding-right: 15px;
}
div {
    display: block;
}

.widget-item-about .about-content-left {
    width: 560px;
    float: left;
    // display: block;
    margin-top: 30px;
    font-size: 15px;
    padding-right: 100px;
    padding-top:30px;
}
.welcome-text {
    font-weight:bold;
    color: #e02525;
    margin: 50px 0 20px;
    font-size: 35px;
    font-style:italic;
    text-align:center;
}
p {
    margin: 65px 0 10px;
    font-size:19px;
    font-style:italic;
}
.about-content-right {
    font-weight:bold;
    width:100%;
    color: #e02525;
    padding: 0px 30px;
    margin-top: -19px;
    font-size: 30px;
    text-align: center;
    font-style:italic;
    padding-top: 50px;
}

`;