import React, { Component } from 'react'
import Navbar from './navbar.component';
import styled from 'styled-components';


import "bootstrap/dist/css/bootstrap.min.css";


export default class Login extends Component {
    render() {
        return (
            <UserLoginContainer>
                <div>
                    <Navbar />
                    <div className="container container-fluid">
                        <div className="d-flex justify-content-center h-100">
                            <div class="card loginCard">
                                <div className="card-header">
                                    <div class="btn-group ButtonGroup nav nav-tabs card-header-tabs" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-rounded btn-info">BloodBank</button>
                                        <button type="button" className="btn btn-rounded btn-info">Donor</button>
                                        <button type="button" className="btn btn-rounded btn-info">Reciever</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h3>Sign In</h3>
                                    <form>
                                        <div className="input-group form-group">
                                            <input type="text" className="form-control" placeholder="username" required />
                                        </div>
                                        <div className="input-group form-group">
                                            <input type="password" className="form-control" placeholder="password" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Login" className="btn float-right login_btn" />
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-center Signup">
                                        Don't have an account?<a href="/signup">Sign Up</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLoginContainer>
        )
    }
}


const UserLoginContainer = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

html,body{
height: 100%;
}

.container{
height: 100%;
align-content: center;
padding-top: 150px;
font-family: 'Righteous', cursive;
}

.loginCard{
height: 340px;
align-content: center;
margin: auto;
width: 370px;
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

.Signup a{
color: darkblue;
margin-left: 5px;
}

.Signup {
    color: white;
}

.ButtonGroup {
    margin: auto;
    justify-content: center;
}

`