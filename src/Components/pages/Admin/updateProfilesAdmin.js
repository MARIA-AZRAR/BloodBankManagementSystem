import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios'
import ErrorNotice from '../../misc/ErrorNotice';
import Swal from 'sweetalert2';



function UpdateBloodBankAdmin(props) {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("")

    //for error
    const [error, setError] = useState();


    const { userLoginData } = useContext(UserContext)
    const history = useHistory();

    useEffect(() => {
        if (!userLoginData.userData)
            history.push('/')
        try {
            if (userLoginData.userData.type !== "Admin")
                history.push(`/${userLoginData.userData.type}`)

            Axios.get('http://localhost:5000/user/' + props.match.params.id)
                .then(response => {

                    setName(response.data.name);
                    setAddress(response.data.address);
                    setEmail(response.data.email);
                    setContact(response.data.contact);
                    setType(response.data.type)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        catch {
            history.push('/')
        }
    }, [userLoginData])


    const back = async (e) => {
        e.preventDefault();
        history.push('/Admin/BloodBank')
    }

    const update = async (e) => {
        e.preventDefault();
        try {

            const updatedUser = { name, address, contact, email };
            await Axios.post(`http://localhost:5000/user/update/${props.match.params.id}`, updatedUser);  //user and its login data in diff tables

            Swal.fire(
                'Good job!',
                'Profile Updated Successfully',
                'success'
            )

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <BloodBankProfileContainer>
            <div>
                <h1 className="heading">Update BloodBank</h1>
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
                                        <label for="BloodBankEmail" >Email: </label>
                                        <input id="BloodBankEmail" type="text" className="form-control"
                                            value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Back" className="btn float-right back_btn" onClick={back} />
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
        </BloodBankProfileContainer>
    )

}

export default UpdateBloodBankAdmin;

const BloodBankProfileContainer = styled.div`

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
height: 410px;
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

.back_btn{
    color: white;
    background-color: #e02525;
    width: 100px;
    margin: 0 40px;
}
    
.back_btn:hover{
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

