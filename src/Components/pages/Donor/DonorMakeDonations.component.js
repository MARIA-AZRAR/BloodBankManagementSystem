import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2'

import Axios from "axios"
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext';  //to save data after registering
import ErrorNotice from '../../misc/ErrorNotice'


export default function DonorMakeDonations() {

    const [quantity, setQuantity] = useState();


    //for error
    const [error, setError] = useState();

    const {userLoginData , } = useContext(UserContext);  //to save user_id for later use

    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(userLoginData.userData);
            
            const user_id = userLoginData.userData.user_id;
            const bloodGroup = userLoginData.userData.bloodGroup;
            const bloodBank_id = userLoginData.userData.bloodBank_id;

            const newDonation = { user_id, quantity, bloodGroup};
            const newBlodBag = {bloodBank_id, quantity, bloodGroup};
            await Axios.post("http://localhost:5000/donation/addDonation", newDonation);  //user and its login data in diff tables
            await Axios.post("http://localhost:5000/bloodBag/addBloodBag", newBlodBag);  //user and its login data in diff tables

            Swal.fire(
                'Good job!',
                'You Donated Blood Successfully',
                'success'
              )

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <DonorMakeDonationsContainer>
            <div>
                <div className="container container-fluid">
                    <div className="d-flex justify-content-center h-100 ">
                        <div class="card signupCard">
                            <div className="card-body">
                                <h3>Make Donations</h3>
                                {error && (
                                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                )}
                                <form>
                                    <div className="input-group form-group">
                                        <label className="col-sm-4" for="bloodQuantity" >Blood Group</label>
                                        {userLoginData.userData ? 
                                         <p>{userLoginData.userData.bloodGroup}</p> : <p></p>
                                        }   
                                    </div>
                                    <div className="input-group form-group">
                                        <label className="col-sm-4" for="bloodQuantity" >Quantity </label>
                                        <input id="BloodQuantity" type="text" className="form-control"  onChange={(e) => setQuantity(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Donate" className="btn float-right login_btn" onClick={submit}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DonorMakeDonationsContainer>
    )
}


const DonorMakeDonationsContainer = styled.div`

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
height: 340px;
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
margin: 25px 50px;
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
@media (max-width: 635px) {
    .signupCard
    {
        height: 380px;
    }
}

@media (max-width: 325px) {
    .signupCard
    {
        height: 420px;
    }
}

`