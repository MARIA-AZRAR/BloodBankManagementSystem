import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios'
import { bloodGroups } from '../../../context/BloodGroupsList';
import ErrorNotice from '../../misc/ErrorNotice';
import Swal from 'sweetalert2'



function DonorProfile() {

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
            if (userLoginData.userData.type !== "Donor")
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
                await Axios.delete(` http://localhost:5000/login/delete`,
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
            <DonorProfileContainer>
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
            </DonorProfileContainer>

        )
    }


    return (
        <DonorProfileContainer>
            <div>
                <h1 className="heading">Update Profile:</h1>
                <div className="container container-fluid">
                    <div className="d-flex justify-content-center h-100">
                        <div class="card signupCard">
                            <div className="card-body">
                                <h3>Profile</h3>
                                {error && (
                                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                )}
                                <form>
                                    <div className="input-group form-group">
                                        <label for="bloodBankName" >Name: </label>
                                        <input id="bloodBankName" type="text" value={name} className="form-control"
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="bloodGroup" >Blood Group: </label>
                                        <select value={bloodGroup} id="bloodGroup" className="form-control" onChange={(e) => setBloodGroup(e.target.value)}>
                                            {bloodGroups.map(item => {
                                                return (
                                                    <option value={item}> {item} </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankAddress" >Address: </label>
                                        <input id="BloodBankAddress" value={address} type="text" className="form-control"
                                            onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankContact" >Contact No: </label>
                                        <input id="BloodBankContact" type="text" className="form-control"
                                            value={contact} onChange={(e) => setContact(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="age" >Age: </label>
                                        <input id="age" type="text" className="form-control"
                                            value={age} onChange={(e) => setAge(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankUsername" >Username: </label>
                                        <input id="BloodBankUsername" type="text" className="form-control"
                                            value={username} onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankEmail" >Email: </label>
                                        <input id="BloodBankEmail" type="text" className="form-control"
                                            value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankPassword" >Blood Bank: </label>
                                        <input id="BloodBankPassword" type="text" className="form-control"
                                            value={profileData.bloodBank} readonly />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankPassword" >Password: </label>
                                        <input id="BloodBankPassword" type="password" className="form-control"
                                            onChange={(e) => setPassword(e.target.value)} />
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
        </DonorProfileContainer>
    )

}

export default DonorProfile;

const DonorProfileContainer = styled.div`

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
align-content: center;
padding-top: 50px;
font-family: 'Righteous', cursive;
}

.signupCard{
height: 650px;
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

.update_btn{
color: black;
background-color: #FFC312;
width: 100px;
margin: 0 40px;
}

.update_btn:hover{
color: black;
background-color: white;
}

.unregister_btn{
    color: white;
    background-color: #e02525;
    width: 100px;
    margin: 0 40px;
}
    
.unregister_btn:hover{
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

{/* <DonorProfileContainer>
<div class="d-flex justify-content-center">
    <div className="spinnerl">
        <div class="spinner-border text-danger" role="status" >
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</div>
</DonorProfileContainer> */}

