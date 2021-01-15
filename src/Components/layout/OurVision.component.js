import React, { useContext } from 'react';
import styled from 'styled-components';

import Axios from 'axios';
import UserContext from '../../context/userDetailContext';  //to save data after registering


const AboutUs = () => {

    const { setUserLoginData } = useContext(UserContext);  //to save user_id for later use


    //get the bloodbanks data for drop down

    const getDropDownData = async () => {

        //calculating all over again bcz if user is on home page then its token shouldn't be set to null

        let sessionToken = localStorage.getItem("auth-token"); //if no key with this name w'll get a null in session token
        if (sessionToken === null) {  //a null session token can erase error at the backend 
            localStorage.setItem("auth-token", "")  //adding key in local storage & value will be given later
            sessionToken = ""   //so assigning it the empty string
        }
        //now checkiing if user is logged in by giving a post request to if token is valid
        const tokenResponse = await Axios.post(
            "http://localhost:5000/login/IsValidToken",
            null,
            {
                headers: { "auth-token": sessionToken }
            });  //data is null but it has a header which will have a token

        let userResponse = ''
        if (tokenResponse.data) {  //true if user logged in
            userResponse = await Axios.get("http://localhost:5000/login/", {
                headers: { "auth-token": sessionToken }
            });
        }

        const dropDownBank = await Axios.get("http://localhost:5000/user/banksDropDown")
        setUserLoginData({
            sessionToken,
            userData: userResponse.data,
            banksData: dropDownBank.data
        });

    }
    getDropDownData();



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