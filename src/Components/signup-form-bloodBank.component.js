import React, { Component } from 'react'
import Navbar from './navbar.component';
import styled from 'styled-components';

  
export default class SignupBloodBank extends Component {
    render() {
        return (
            <SignupContainer>
                <div>
                    <Navbar />
                    <div className="container container-fluid">
                        <div className="d-flex justify-content-center h-100">
                            <div class="card signupCard">
                                <div className="card-header">
                                    <div class="btn-group ButtonGroup nav nav-tabs card-header-tabs" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-rounded btn-info">BloodBank</button>
                                        <button type="button" className="btn btn-rounded btn-info">Donor</button>
                                        <button type="button" className="btn btn-rounded btn-info">Reciever</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h3>Registeration</h3>
                                    <form>
                                        <div className="input-group form-group">
                                            <label for="bloodBankName" >Name: </label>
                                            <input id="bloodBankName" type="text" className="form-control" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="BloodBankAddress" >Address: </label>
                                            <input id="BloodBankAddress" type="text" className="form-control" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="BloodBankContact" >Contact No: </label>
                                            <input id="BloodBankContact" type="text" className="form-control" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="BloodBankUsername" >Username: </label>
                                            <input id="BloodBankUsername" type="text" className="form-control" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="BloodBankEmail" >Email: </label>
                                            <input id="BloodBankEmail" type="text" className="form-control" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="BloodBankPassword" >Password: </label>
                                            <input id="BloodBankPassword" type="password" className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Sign up" className="btn float-right login_btn" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SignupContainer>
        )
    }
}


const SignupContainer = styled.div`

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
padding-top: 150px;
font-family: 'Righteous', cursive;
}

.signupCard{
height: 550px;
align-content: center;
margin: auto;
width: 500px;
background-color: rgba(15, 74, 92, 0.473) ;
}

.card-header {
background-color: white;
}
.card-body h3{
color: white;
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





`