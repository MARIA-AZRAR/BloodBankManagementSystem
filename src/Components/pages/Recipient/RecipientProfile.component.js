import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios'
import { bloodGroups } from '../../../context/BloodGroupsList';
import ErrorNotice from '../../misc/ErrorNotice';
import Swal from 'sweetalert2';



function RecipientProfile() {

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
    const [age, setAge] = useState();
    const [bloodGroup, setBloodGroup] = useState();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    //for error
    const [error, setError] = useState();


    const { userLoginData, setUserLoginData } = useContext(UserContext)
    const history = useHistory();

    const [isLoading, setLoading] = useState(true);  //for 1st loading data
    let [profileData, setProfileData] = useState();

    useEffect(() => {
        if (!userLoginData.userData)
            history.push('/')
        try {
            if (userLoginData.userData.type !== "Recipient")
                history.push(`/${userLoginData.userData.type}`)

            const getData = async () => {
                const userResponse = await Axios.get("http://localhost:5000/login/profile", {
                    headers: { "auth-token": userLoginData.token }
                });
                setProfileData(userResponse.data)
                setName(userResponse.data.name);
                setAddress(userResponse.data.address)
                setContact(userResponse.data.contact)
                setAge(userResponse.data.age)
                setBloodGroup(userResponse.data.bloodGroup)
                setEmail(userResponse.data.email)
                setUserName(userResponse.data.username)

                setLoading(false);
            }
            getData();

        }
        catch {
            history.push('/')
        }

    }, [userLoginData])


    const update = async (e) => {
        e.preventDefault();
        try {

            const updatedUser = { name, address, contact, age, bloodGroup, email };
            await Axios.post(`http://localhost:5000/user/update/${userLoginData.userData.user_id}`, updatedUser);  //user and its login data in diff tables
            const UpdatedLogin = { username, password }
            await Axios.post(`http://localhost:5000/login/update/${userLoginData.userData.id}`, UpdatedLogin);  //user and its login data in diff tables

            Swal.fire(
                'Good job!',
                'Your Profile Updated Successfully',
                'success'
            ) //user and its login data in diff tables



        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };


    const unregister = async (e) => {
        e.preventDefault();
        try {
            await Axios.delete(`http://localhost:5000/login/delete`,
                {
                    headers: { "auth-token": userLoginData.token }
                });  //user and its login data in diff tables

            Swal.fire(
                'Deleted',
                'Awww! Sad to See You Go.',
                'success'
            ) //user and its login data in diff tables

            setUserLoginData({
                token: undefined,
                userData: undefined,
            });
            localStorage.setItem("auth-token", "");
            history.push("/")

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    if (isLoading) {
        return (
            <RecipientProfileContainer>
                <div class="box">
                    <div class="loader">
                        <span class="back">
                            <span>L</span>
                            <span>O</span>
                            <span>A</span>
                            <span>D</span>
                            <span>I</span>
                            <span>N</span>
                            <span>G</span>
                        </span>
                    </div>
                </div>
            </RecipientProfileContainer>

        )
    }


    return (
        <RecipientProfileContainer>
            <div>
                <div className="container container-fluid">
                    <div className="d-flex justify-content-center h-100">
                        <div class="card signupCard">
                            <div className="card-body">
                                <div className="col-md-12">
                                <div className="myLeftCtn"></div>
                                <h3>Profile</h3>
                                {error && (
                                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                )}
                                <form  className="myForm text-center">
                                    <div className="input-group form-group">
                                        
                                        <input id="bloodBankName" type="text" className="myInput" value={name} className="form-control"
                                          placeholder="Name"  onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        
                                        <select className="myInput" value={bloodGroup} id="bloodGroup" className="form-control" onChange={(e) => setBloodGroup(e.target.value)}>
                                            {bloodGroups.map(item => {
                                                return (
                                                    <option value={item}> {item} </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="input-group form-group">
                                        
                                        <input id="BloodBankAddress" value={address} type="text" className="myInput" className="form-control"
                                          placeholder="Address"  onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        
                                        <input id="BloodBankContact" type="text" className="myInput" className="form-control"
                                            value={contact} placeholder="Contact" onChange={(e) => setContact(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        
                                        <input id="age" type="text"className="myInput" className="form-control"
                                            value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                       
                                        <input id="BloodBankUsername" type="text" className="myInput" className="form-control"
                                            value={username} placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        
                                        <input id="BloodBankEmail" type="text" className="myInput" className="form-control"
                                            value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        
                                        <input id="BloodBankPassword" type="text" className="myInput" className="form-control"
                                            value={profileData.bloodBank} placeholder="BloodBank" readonly />
                                    </div>
                                    <div className="input-group form-group">
                                    
                                        <input id="BloodBankPassword" type="password" className="myInput" className="form-control"
                                           placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Unregister" className="btn float-right unregister_btn" onClick={unregister} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Update" className="btn float-right update_btn" onClick={update} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </RecipientProfileContainer>
    )

}

export default RecipientProfile;

const RecipientProfileContainer = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');


html,body{
height: 100%;
}

.spinnerl{
    padding-top:150px;
    padding-bottom:150px;
    
}

label {
padding-right: 20px;
}
.container{
    
height: 100%;
// align-content: center;
padding-top: 50px;
// font-family: 'Righteous', cursive;
// justify-content: center;
    align-items: center;
    // height:160vh;  
    max-width: 900px;
}

.myLeftCtn {
    position: relative;
    background: rgb(247, 236, 236);
    border-radius: 25px;
    height: 100%;
    padding: 20px;
    padding-left: 50px;
  }
  .myLeftCtn header {
    color: #cb2d3e;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

.card-body {
    
    background: rgb(247, 236, 236);;
    border-radius: 25px;
    -webkit-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
} 
.signupCard{
height: 700px;
align-content: center;
margin: auto;
width: 500px;
background: rgb(247, 236, 236);;
    border-radius: 25px;
    -webkit-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 10px 40px -10px rgba(0, 0, 0, 0.7);
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
.card-header {
background-color: white;
}
.card-body h3{
color: #cb2d3e;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align:center;
}
 .myForm {
    position: relative;
    margin-top: 50px;
  } 
#blood{
    width:75%;
    border:none;
}

.update_btn{

width: 100px;
margin: 0px 40px;
background: linear-gradient(45deg, #cb2d3e, #ef473a);
    color: #fff;
    border: none;
}

.update_btn:hover{
background: linear-gradient(45deg, #ef473a, #ef473a);
}

.unregister_btn{
    background: linear-gradient(45deg, #cb2d3e, #ef473a);
    color: #fff;
    border: none;
    width: 100px;
    margin: 0px 40px;
}
    
.unregister_btn:hover{
background: linear-gradient(45deg, #ef473a, #ef473a);
}

.ButtonGroup {
    margin: auto;
    justify-content: center;
}
.heading{
    padding-top:5%;
    padding-left:30%
}

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

 
.box{
    background: none;
    margin-top: 200px;
	padding-top:300px;
}

.loader{
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}​
	.back {
		margin:1em auto;
	}
	.back span {
		font-size:3em;
		color:#F2C640;;
		background: #e02525;
		display:table-cell;
		box-shadow:inset 0 0 5px rgba(0,0,0,0.3), 0 5px 0 #ccc;
		padding: 0 15px;
		line-height: 100px;
		animation:jumb 2s infinite;
	}
	@keyframes jumb {
		0% {
			transform:translateY(0px)
		}
		50% {
			transform:translateY(-30px);
			box-shadow:0 15px 0 #F2C640;
		}
		100% {
			transform:translateY(0px)	
		}
	}
	.back span:nth-child(1) {
		animation-delay:0s;
	}
	.back span:nth-child(2) {
		animation-delay:.1s;	
	}
	.back span:nth-child(3) {
		animation-delay:.2s;
	}
	.back span:nth-child(4) {
		animation-delay:.3s;	
	}
	.back span:nth-child(5) {
		animation-delay:.4s;
	}
	.back span:nth-child(6) {
		animation-delay:.5s;	
	}
	.back span:nth-child(7) {
		animation-delay:.6s;
	}


`

