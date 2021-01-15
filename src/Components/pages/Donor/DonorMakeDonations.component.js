import React, { Component } from 'react';
import { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'


function DonorMakeDonations () {
    const { userLoginData } = useContext(UserContext)
  const history = useHistory();

  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "Donor")
        history.push(`/${userLoginData.userData.type}`)
    }
    catch {
      history.push('/')
    }

  }, [userLoginData])
        return (
            <DonorMakeDonationsContainer>
                <div>
                <h1 className="heading">Donate Blood:</h1>
                    <div className="container container-fluid">
                        <div className="d-flex justify-content-center h-100">
                            <div class="card signupCard">
        
                                <div className="card-body">
                                    <h3>Make Donations</h3>
                                    <form>
                                        <div className="input-group form-group">
                                            <label for="bloodGroup" >Blood Group: </label>
                                            <select  id="BloodGroup" name="bloodGroup">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="O-">O-</option>
            </select>
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="bloodQuantity" >Quantity: </label>
                                            <input id="BloodQuantity" type="text" className="form-control" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="dueDate" >Date: </label>
                                            <input id="BloodDonatedDate" type="text" className="form-control" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="bloodBank" >Blood Bank: </label>
                                            <input id="BloodBankUsername" type="text" className="form-control" required />
                                        </div>
                    
                                        <div className="form-group">
                                            <input type="submit" value="Donate" className="btn float-right login_btn" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DonorMakeDonationsContainer>
        )
}
export default DonorMakeDonations;

const DonorMakeDonationsContainer = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

html,body{
height: 100%;
}

label {
padding-right: 20px;
}

.container{
height: 100%;
align-content: center;
padding-top: 40px;
font-family: 'Righteous', cursive;
}

.signupCard{
height: 370px;
align-content: center;
margin: auto;
width: 500px;
background-color: rgba(15, 74, 92, 0.473) ;
}

.card-body h3{
color: white;
}

#blood{
    width:75%;
    border:none;
}


.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.ButtonGroup {
    margin: auto;
    justify-content: center;
}
.heading{
    padding-top:5%;
    padding-left:30%
}

`