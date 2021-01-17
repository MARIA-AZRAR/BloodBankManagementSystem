import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios'
import { bloodGroups } from '../../../context/BloodGroupsList';
import ErrorNotice from '../../misc/ErrorNotice'


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


    const { userLoginData } = useContext(UserContext)
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

            const updatedUser = { name, address, contact, age, bloodGroup, email};
            await Axios.post(`http://localhost:5000/user/update/${userLoginData.userData.user_id}`, updatedUser);  //user and its login data in diff tables
            const UpdatedLogin = {username, password}
            await Axios.post(`http://localhost:5000/login/update/${userLoginData.userData.user_id}`, UpdatedLogin);  //user and its login data in diff tables

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };


    const unregister = async (e) => {
        e.preventDefault();
    }

    if (isLoading) {
        return (
            <div className="container container-fluid">
                <h2 justify-content-center> Wait</h2>
            </div>
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
                                        <label for="bloodGroup" >Name: </label>
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
`



// import React, { useEffect, useContext, useState  } from 'react';
// import { useHistory } from 'react-router-dom';
// import styled from 'styled-components';
// import UserContext from '../../../context/userDetailContext'
// import Axios from 'axios'

// function ChildProfile(props) {
//     const { userLoginData } = useContext(UserContext)
//     const history = useHistory();

//     useEffect(() => {
//         if (!userLoginData.userData)
//             history.push('/')
//         try {
//             if (userLoginData.userData.type !== "Donor")
//                 history.push(`/${userLoginData.userData.type}`)
//         }
//         catch {
//             history.push('/')
//         }

//     }, [userLoginData])
//     return (
//         <DonorProfileContainer>
//             <div>
//                 <h1 className="heading">Update Profile:</h1>
//                 <div className="container container-fluid">
//                     <div className="d-flex justify-content-center h-100">
//                         <div class="card signupCard">
//                             <div className="card-body">
//                                 <h3>Profile</h3>
//                                 <form>
//                                     <div className="input-group form-group">
//                                         <label for="bloodBankName" >Name: </label>
//                                         <input id="bloodBankName" type="text" value = { props.profile.name} className="form-control" required />
//                                     </div>
//                                     <div className="input-group form-group">
//                                         <label for="bloodBankName" >Blood Group: </label>
//                                         <select id="blood" name="bloodGroup">
//                                             <option value="A+">A+</option>
//                                             <option value="A-">A-</option>
//                                             <option value="B+">B+</option>
//                                             <option value="O-">O-</option>
//                                         </select>
//                                     </div>
//                                     <div className="input-group form-group">
//                                         <label for="BloodBankAddress" >Address: </label>
//                                         <input id="BloodBankAddress" type="text" className="form-control" required />
//                                     </div>
//                                     <div className="input-group form-group">
//                                         <label for="BloodBankContact" >Contact No: </label>
//                                         <input id="BloodBankContact" type="text" className="form-control" required />
//                                     </div>
//                                     <div className="input-group form-group">
//                                         <label for="BloodBankUsername" >Username: </label>
//                                         <input id="BloodBankUsername" type="text" className="form-control" required />
//                                     </div>
//                                     <div className="input-group form-group">
//                                         <label for="BloodBankEmail" >Email: </label>
//                                         <input id="BloodBankEmail" type="text" className="form-control" required />
//                                     </div>
//                                     <div className="input-group form-group">
//                                         <label for="BloodBankPassword" >Password: </label>
//                                         <input id="BloodBankPassword" type="password" className="form-control" required />
//                                     </div>
//                                     <div className="input-group form-group">
//                                         <label for="BloodBankPassword" >Blood Bank: </label>
//                                         <input id="BloodBankPassword" type="password" className="form-control" required />
//                                     </div>
//                                     <div className="form-group">
//                                         <input type="submit" value="Unregister" className="btn float-right login_btn" />
//                                     </div>
//                                     <div className="form-group">
//                                         <input type="submit" value="Update" className="btn float-right login_btn" />
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </DonorProfileContainer>
//     )
// }


// //this will take data and will not render until data is not fetch
// function DonorProfile() {

//     let [profileData, setProfileData] = useState();
//     const { userLoginData } = useContext(UserContext)

//     useEffect(() => {
//         const getData = async () =>{

//             const userResponse = await Axios.get("http://localhost:5000/login/profile", {
//                 headers: { "auth-token": userLoginData.token }
//             });

//             setProfileData(userResponse.data)
//         }
//         getData();

//     }, [])

//     return(
//         <>
//           {profileData && <ChildProfile profile={profileData}/>} 
//         </>
//     )
// }



// export { DonorProfile , ChildProfile};

// const DonorProfileContainer = styled.div`

// @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

// html,body{
// height: 100%;
// }

// label {
// padding-right: 20px;
// }
// .container{
// height: 100%;
// align-content: center;
// padding-top: 50px;
// font-family: 'Righteous', cursive;
// }

// .signupCard{
// height: 570px;
// align-content: center;
// margin: auto;
// width: 500px;
// background-color: rgba(15, 74, 92, 0.473) ;
// }

// .card-header {
// background-color: white;
// }
// .card-body h3{
// color: white;
// text-align:center;
// padding-bottom:5px;
// }
// #blood{
//     width:75%;
//     border:none;
// }

// .login_btn{
// color: black;
// background-color: #FFC312;
// width: 100px;
// margin: 0 40px;
// }

// .login_btn:hover{
// color: black;
// background-color: white;
// }

// .ButtonGroup {
//     margin: auto;
//     justify-content: center;
// }
// .heading{
//     padding-top:5%;
//     padding-left:30%
// }
// `