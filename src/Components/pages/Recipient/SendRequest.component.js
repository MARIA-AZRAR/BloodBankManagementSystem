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
                                        <label for="bloodBankName" >Blood Group </label>
                                        <select id="blood" name="bloodGroup" onChange={(e) => { setBloodGroup(e.target.value) }}>
                                            {bloodGroups.map(item => {
                                                return (
                                                    <option value={item}> {item} </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankAddress" >Due Date </label>
                                        <input id="BloodBankAddress" type="date" className="form-control" onChange={(e) => { setDate(e.target.value) }} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankContact" >Address </label>
                                        <input id="BloodBankContact" type="text" className="form-control" onChange={(e) => { setAddress(e.target.value) }} />
                                    </div>
                                    <div className="input-group form-group">
                                        <label for="BloodBankUsername" >Quantity </label>
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
    padding: 35px;
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
height: 400px;
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
    font-size: 24px;
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

.btn{
width: 100px;
margin: 0px 40px;
background: linear-gradient(45deg, #cb2d3e, #ef473a);
    color: #fff;
    border: none;
}

.btn:hover{
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

`