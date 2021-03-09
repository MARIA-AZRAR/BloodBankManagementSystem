import React, { useState, useContext , useEffect} from 'react';
import { useHistory } from "react-router-dom";   //after login we need to change the page
import Axios from "axios"
import styled from 'styled-components';

import UserContext from '../../context/userDetailContext';  //to save data after registering
import ErrorNotice from '../misc/ErrorNotice'
import {bloodGroups} from '../../context/BloodGroupsList';



function ChildSignupRecipient(props) {

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

    //for error
    const [error, setError] = useState();

    const {setUserLoginData } = useContext(UserContext);  //to save user_id for later use
    const history = useHistory();  //to store history

    const submit = async (e) => {
        e.preventDefault();
        try {
            const type = "Recipient";
            const newUser = { name, address, contact,age,bloodGroup, bloodBank ,username, email, type, password, confirmPassword };
            await Axios.post("http://localhost:5000/user/addUser", newUser);  //user and its login data in diff tables
            await Axios.post("http://localhost:5000/login/addLogin", newUser);

            //registred but to store id in context we need to login
            const loginRes = await Axios.post("http://localhost:5000/login/accountLogin", {
                username,
                password,
            });

            setUserLoginData({
                token: loginRes.data.token,
                userData: loginRes.data.user
            });

            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/Recipient");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    const BloodBank = () =>{
        history.push("/signup")
    };

    const Donor = () =>{
        history.push("/signup-donor")
    };

    const Recipient = () =>{
        history.push("/signup-recipient")
    };

    return (
        <SignupContainer>
             <div>
                <div className="container">
                    <div className="myCard">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="myLeftCtn">
                                    <div class="btn-group ButtonGroup nav nav-tabs card-header-tabs" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-rounded bt" onClick={BloodBank}>BloodBank</button>
                                        <button type="button" className="btn btn-rounded bt" onClick={Donor}>Donor</button>
                                        <button type="button" className="btn btn-rounded bt" onClick={Recipient}>Reciever</button>
                                    </div>

                                    <form className="myForm text-center">
                                        <header>Registeration</header>
                                        {error && (
                                            <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                        )}
                                        <div className="form-group">
                                            <i class="fas fa-id-badge icon"></i>
                                            <input type="text" className="myInput"
                                                placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <i class="fas fa-map-pin icon"></i>
                                            <input type="text" className="myInput"
                                                placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <i class="fas fa-file-alt icon"></i>
                                            <input type="text" className="myInput"
                                                placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                        <i class="fas fa-tint icon"></i>                                         
                                        <select className="myInput" onChange={(e) => setBloodGroup(e.target.value)}>
                                                <option selected disabled hidden>Choose Here</option>
                                                {bloodGroups.map(item => {

                                                    return (

                                                        <option value={item}> {item}  </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                        <i class="fas fa-university icon"></i>
                                            <select className="myInput" onChange={(e) => setBloodBank(e.target.value)}>
                                                <option selected disabled hidden>Choose Here</option>
                                                {props.banksList.map(item => {
                                                    return (
                                                        <option value={item}> {item} </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <i class="fas fa-address-card icon"></i>
                                            <input type="text" className="myInput"
                                                placeholder="Contact No" onChange={(e) => setContact(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <i className="fas fa-user icon"></i>
                                            <input type="text" className="myInput" placeholder="Username" id="username" onChange={(e) => { setUserName(e.target.value) }} required />
                                        </div>
                                        <div className="form-group">
                                            <i class="fas fa-envelope icon"></i>
                                            <input type="email" className="myInput"
                                                placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <i className="fas fa-lock icon"></i>
                                            <input type="password" className="myInput" placeholder="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <i className="fas fa-lock icon"></i>
                                            <input type="password" className="myInput"
                                                placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Sign Up" className="butt" onClick={submit} />
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
        </SignupContainer>
    )
}


function SignupRecipinet() {

    const [dropItem, setDropItem] = useState();
    useEffect(() => {
        // //get Blooddropdowndata to pass as props

        const drop = async () => {
            const items = await Axios.get("http://localhost:5000/user/banksDropDown")
            setDropItem(items.data);
        }
        drop();
    }, [])

    return (
        <>
        {dropItem && <ChildSignupRecipient banksList= {dropItem} />}
        </>
    )
}

export {SignupRecipinet , ChildSignupRecipient}

const SignupContainer = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height:160vh;  
    max-width: 940px;
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
    width: 270px;
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

.ButtonGroup {
    margin: auto;
    justify-content: center;
}

.ButtonGroup .bt{
    background: linear-gradient(45deg, #cb2d3e, #ef473a);
    color: #fff;
    border: none;
}

.ButtonGroup .bt:hover {
    background: linear-gradient(45deg, #ef473a, #ef473a);

}

`
