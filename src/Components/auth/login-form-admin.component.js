
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";   //after login we need to change the page
import styled from 'styled-components';
import UserContext from '../../context/userDetailContext';  //to save data after registering
import ErrorNotice from '../misc/ErrorNotice'

import Axios from "axios"

import "bootstrap/dist/css/bootstrap.min.css";


export default function LoginAdmin() {

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
            const loginRes = await Axios.post("http://localhost:5000/login/AdminLogin", loggedUser);

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
        <AdminLoginContainer>
            <div>
                <div className="container">
                    <div className="myCard">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="myLeftCtn">
                                    <form className="myForm text-center">
                                        <header>Sign In</header>
                                        {error && (
                                            <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                        )}
                                        <div className="form-group">
                                            <i className="fas fa-user icon"></i>
                                            <input type="text" className="myInput" placeholder="Username" id="username" onChange={(e) => { setUserName(e.target.value) }} required />
                                        </div>
                                        <div className="form-group">
                                            <i className="fas fa-lock icon"></i>
                                            <input type="password" className="myInput" placeholder="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Login" className="butt" onClick={submit} />
                                        </div> 
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="myRightCtn">
                                    <div class="box">
                                        <h3>“There is no exercise better for the heart than reaching down and lifting people up.” </h3>
                                        <p class="name">-John Holmes</p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLoginContainer>
    )
}

const AdminLoginContainer = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');


.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height:100vh;  
    max-width: 800px;
}

.myRightCtn {
    position: relative;
    background-image: linear-gradient(45deg, #cb2d3e, #ef473a);
    border-radius: 25px;
    height: 100%;
    padding: 25px;
    color: rgb(255, 249, 249);
    font-size: 12px; 
    display: flex;
    justify-content: center;
    align-items: center;
  }

  
  
  .myLeftCtn {
    position: relative;
    background: rgb(247, 236, 236);
    border-radius: 25px;
    height: 100%;
    padding: 25px;
    padding-left: 50px;
  }
  
  
  .myLeftCtn header {
    color: #cb2d3e;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .row{
    height: 100%;
} 

.myCard {
    
    background: rgb(247, 236, 236);;
    border-radius: 25px;
    -webkit-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
} 

.box {
position: relative;
margin: 20px;
]  } 

.box .name {
  text-align: right;
  font-style: italic;
}

.myLeftCtn .myInput {
    width: 230px;
    border-radius: 25px;
    padding: 10px;
    padding-left: 50px;
    border: none;
    -webkit-box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 49px -14px rgba(0, 0, 0, 0.7);
  }
  .myLeftCtn .myInput:focus {
    outline: none;
  } 
  .myForm {
    position: relative;
    margin-top: 50px;
  } 
  .myLeftCtn .butt {
    background: linear-gradient(45deg, #cb2d3e, #ef473a);
    color: #fff;
    width: 100px;
    border: none;
    border-radius: 25px;
    padding: 10px;
    -webkit-box-shadow: 0px 10px 41px -11px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 41px -11px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 41px -11px rgba(0, 0, 0, 0.7);
  } 
  .myLeftCtn .butt:hover {
    background: linear-gradient(45deg, #ef473a, #ef473a);
  }
  .myLeftCtn .butt:focus {
    outline: none;
  } 

  .myLeftCtn .icon {
    position: relative;
    color: #ef473a;
    left: 36px;
  } 
 
.Signup {
    margin-top: 12px;
}
  



`