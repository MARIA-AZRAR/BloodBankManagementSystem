
import React, { Component, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";   //after login we need to change the page
import styled from 'styled-components';
import UserContext from '../../context/userDetailContext';  //to save data after registering
import ErrorNotice from '../misc/ErrorNotice'

import Axios from "axios"

import "bootstrap/dist/css/bootstrap.min.css";


export default function Login() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    //for error
    const [error, setError] = useState();

    const { userLoginData,setUserLoginData } = useContext(UserContext);  //to save user_id for later use
    const history = useHistory();  //to store history

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loggedUser = { username, password };
            //to login
            const loginRes = await Axios.post("http://localhost:5000/login/accountLogin", loggedUser);

            setUserLoginData({
                token: loginRes.data.token,
                userData: loginRes.data.user,
            });

            localStorage.setItem("auth-token", loginRes.data.token);
            const type = loginRes.data.user.type;
            history.push(`/${type}`);
        } catch (err) {

            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <UserLoginContainer>
            <div>
                <div className="container container-fluid">
                    <div className="d-flex justify-content-center h-100">
                        <div class="card loginCard">
                            <div className="card-body">
                                <h3>Sign In</h3>
                                {error && (
                                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                )}
                                <form>
                                    <div className="input-group form-group">
                                        <input type="text" className="form-control" placeholder="username" onChange={(e) => { setUserName(e.target.value) }} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="password" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Login" className="btn float-right login_btn" onClick={submit} />
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
height: 330px;
align-content: center;
margin: auto;
width: 370px;
background-color: rgba(15, 74, 92, 0.473) ;
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



`