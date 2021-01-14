import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";   //after login we need to change the page
import Axios from "axios"
import styled from 'styled-components';

import UserContext from '../../context/userDetailContext';  //to save data after registering
import ErrorNotice from '../misc/ErrorNotice'


export default function SignupBloodBank() {

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
    const [age, setAge] = useState();
    const [bloodGroup, setBloodGroup] = useState();
    const [bloodBank, setBloodBank] = useState();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    //for drop down
    const [dropDownItems, setDropDownItems] = useState();

    //for error
    const [error, setError] = useState();

    const { userLoginData, setUserLoginData } = useContext(UserContext);  //to save user_id for later use
    const history = useHistory();  //to store history


    // const getDropdownData = async () => {
    //     let items = await Axios.get("http://localhost:5000/user/banksDropDown"); //get all blood banks 
    //     setDropDownItems(items.data);
    //     console.log(items.data);
    // }

    // getDropdownData();


    const submit = async (e) => {
        e.preventDefault();
        try {
            const type = "Donor";
            const newUser = { name, address, contact, age, bloodGroup, bloodBank, username, email, type, password, confirmPassword };
            await Axios.post("http://localhost:5000/user/addUser", newUser);  //user and its login data in diff tables
            await Axios.post("http://localhost:5000/login/addLogin", newUser);

            //registred but to store id in context we need to login
            const loginRes = await Axios.post("http://localhost:5000/login/accountLogin", {
                username,
                password,
            });

            setUserLoginData({
                token: loginRes.data.token,
                userData: loginRes.data.user,
            });

            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/Donor");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    const BloodBank = () => {
        history.push("/signup")
    };

    const Donor = () => {
        history.push("/signup-donor")
    };

    const Recipient = () => {
        history.push("/signup-recipient")
    };

    return (
        <SignupContainer>
            <div>
                <div className="container container-fluid">
                    <div className="d-flex justify-content-center h-100">
                        <div class="card signupCard">
                            <div className="card-header">
                                <div class="btn-group ButtonGroup nav nav-tabs card-header-tabs" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-rounded btn-info" onClick={BloodBank}>BloodBank</button>
                                    <button type="button" className="btn btn-rounded btn-info" onClick={Donor}>Donor</button>
                                    <button type="button" className="btn btn-rounded btn-info" onClick={Recipient}>Reciever</button>
                                </div>
                            </div>
                            <div className="card-body">
                                <h3>Registeration</h3>
                                {error && (
                                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                )}
                                <form>
                                    <div className="input-group form-group">
                                        <input type="text" className="form-control"
                                            placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="text" className="form-control"
                                            placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="text" className="form-control"
                                            placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="text" className="form-control"
                                            placeholder="Blood Group" onChange={(e) => setBloodGroup(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <select onChange={(e) => setBloodBank(e.target.value)}>
                                            {userLoginData.banksData.map(item => {
                                                return (
                                                    <option value={item}> {item} </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="text" className="form-control"
                                            placeholder="Blood Bank" onChange={(e) => setBloodBank(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="text" className="form-control"
                                            placeholder="Contact No" onChange={(e) => setContact(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="text" className="form-control"
                                            placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="email" className="form-control"
                                            placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="password" className="form-control"
                                            placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <input type="password" className="form-control"
                                            placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Sign up" className="btn float-right login_btn" onClick={submit} />
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
height: 765px;
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