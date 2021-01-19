import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { bloodGroups } from '../../../context/BloodGroupsList';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios';
import ErrorNotice from '../../misc/ErrorNotice';
import Swal from 'sweetalert2';

export default function RecipientSendRequest() {
    const [date, setDate] = useState();
    const [address, setAddress] = useState();
    const [quantity, setQuantity] = useState();
    const [bloodGroup, setBloodGroup] = useState();

    const { userLoginData} = useContext(UserContext);
    const history = useHistory();

    const [user_id , setUserId] = useState(userLoginData.userData.user_id)
    const [error, setError] = useState();


    useEffect(() => {
        if (!userLoginData.userData)
            history.push('/')
        try {
            if (userLoginData.userData.type !== "Recipient")
                history.push(`/${userLoginData.userData.type}`)

        }
        catch {
            history.push('/')
        }

    }, [])


    const submit = async (e) => {
        e.preventDefault();
        try {

            const newRequest = { date, address, quantity, bloodGroup , user_id };
            await Axios.post("http://localhost:5000/bloodRequest/addBloodRequest" , newRequest);  //user and its login data in diff tables

            Swal.fire(
                'Good job!',
                'Your Request have been posted',
                'success'
            ) 

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };



    return (
        <RecipientRequestContainer>
            <div>
                <div className="container container-fluid">
                    <div className="d-flex justify-content-center h-100">
                        <div class="card signupCard">

                            <div className="card-body">
                                <h3>Request For Blood</h3>
                                {error && (
                                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                )}
                                <form>
                                    <div className="input-group form-group">
                                        <label for="bloodBankName" >Blood Group: </label>
                                        <select id="blood" name="bloodGroup" onChange={(e) => { setBloodGroup(e.target.value) }}>
                                            {bloodGroups.map(item => {
                                                return (
                                                    <option value={item}> {item} </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankAddress" >Due Date: </label>
                                        <input id="BloodBankAddress" type="date" className="form-control" onChange={(e) => { setDate(e.target.value) }} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankContact" >Address: </label>
                                        <input id="BloodBankContact" type="text" className="form-control" onChange={(e) => { setAddress(e.target.value) }} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankUsername" >Quantity: </label>
                                        <input id="BloodBankUsername" type="text" className="form-control" onChange={(e) => { setQuantity(e.target.value) }} />
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Request" className="btn float-right login_btn" onClick={submit} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RecipientRequestContainer>
    )
}

const RecipientRequestContainer = styled.div`

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
padding-top: 40px;
font-family: 'Righteous', cursive;
}

.signupCard{
height: 370px;
align-content: center;
margin: auto;
width: 500px;
background-color: rgba(15, 74, 92, 0.473) ;
}

.card-body h3{
color: white;
}

#blood{
    width:75%;
    border:none;
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