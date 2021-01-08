import React, { Component } from 'react'
import styled from 'styled-components';

import "bootstrap/dist/css/bootstrap.min.css";

export default class LoginAdmin extends Component {
    render() {
        return (
            <AdminLoginContainer>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div class="card AdminloginCard">
                            <div className="card-header">
                                <h3>Sign In</h3>
                            </div>
                            <div className="card-body">
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
                        </div>
                    </div>
                </div>
            </AdminLoginContainer>
        )
    }
}




const AdminLoginContainer = styled.div`

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

.AdminloginCard {
    height: 250px;
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