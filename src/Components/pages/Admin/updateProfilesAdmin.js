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
                                <form myForm text-center>
                                    <div className="input-group form-group">
                                      
                                        <input id="bloodBankName" type="text"  className="myInput" value={name} className="form-control"
                              placeholder="Name"  onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                       
                                        <input id="BloodBankAddress" value={address} type="text"  className="myInput" className="form-control"
                                      placeholder="Address"    onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        
                                        <input id="BloodBankContact" type="text"  className="myInput" className="form-control"
                                            value={contact}    placeholder="Contact"  onChange={(e) => setContact(e.target.value)} />
                                    </div>
                                    <div className="input-group form-group">
                                        
                                        <input id="BloodBankEmail" type="text"  className="myInput" className="form-control"
                                            value={email}    placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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
height: 500px;
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
margin: 20px 40px;
background: linear-gradient(45deg, #cb2d3e, #ef473a);
    color: #fff;
    border: none;
}

.update_btn:hover{
background: linear-gradient(45deg, #ef473a, #ef473a);
}

.back_btn{
    background: linear-gradient(45deg, #cb2d3e, #ef473a);
    color: #fff;
    border: none;
    width: 100px;
    margin: 20px 40px;
}
    
.back_btn:hover{
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

