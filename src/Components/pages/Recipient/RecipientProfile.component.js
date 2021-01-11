import React, { Component } from 'react'
//import Navbar from './navbar.component';
import styled from 'styled-components';

  
export default class RecipientProfile extends Component {
    render() {
        return (
            <RecipientProfileContainer>
                <div>
                    <div className="container container-fluid">
                        <div className="d-flex justify-content-center h-100">
                            <div class="card signupCard">

                                <div className="card-body">
                                    <h3>Profile</h3>
                                    <form>
                                        <div className="input-group form-group">
                                            <label for="bloodBankName" >Name: </label>
                                            <input id="bloodBankName" type="text" className="form-control" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <label for="bloodBankName" >Blood Group: </label>
                                            <select  id="blood" name="bloodGroup">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="O-">O-</option>
            </select>
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
                                        <div className="input-group form-group">
                                            <label for="BloodBankPassword" >Blood Bank: </label>
                                            <input id="BloodBankPassword" type="password" className="form-control" required />
                                        </div>

                                        <div className="form-group">
                                            <input type="submit" value="Unregister" className="btn float-right login_btn" />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Update" className="btn float-right login_btn" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RecipientProfileContainer>
        )
    }
}


const RecipientProfileContainer = styled.div`

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
height: 570px;
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
text-align:center;
padding-bottom:5px;
}
#blood{
    width:75%;
    border:none;
}

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
margin: 0 40px;
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