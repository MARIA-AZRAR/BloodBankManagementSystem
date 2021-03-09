import React, { useEffect, useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext';
import Axios from 'axios';
import Swal from 'sweetalert2';



function RenderButtons(props) {
  if (props.status === 'Active') {
    return (
      <td>
        <button type="button" class="btn btn-primary" onClick={props.updateD}>Update</button>
        <br />
        <button type="button" class="btn btn-danger" onClick={props.deleteD}>Delete</button>
      </td>
    )
  }

  return (
    <td>
    </td>
  )
}


function DonorRow(props) {

  const history = useHistory();

  const deleteDonor = async () => {
    await Axios.delete(`http://localhost:5000/login/deleteBloodBank/${props.donor_id}`)
    console.log("deleted");
    Swal.fire(
      'Deleted',
      'Awww! Sad to See You Go.',
      'success'
    )
    props.update();
  }

  const updateDonor = (e) => {
    e.preventDefault();
    history.push('/BloodBank/ProfileEdit/' + props.donor_id);
  }

  return (
    <tr>
      <th scope="row">{props.index}</th>
      <td>{props.donor.name}</td>
      <td>{props.donor.age} </td>
      <td>{props.donor.bloodGroup}</td>
      <td>{props.donor.address}</td>
      <td>{props.donor.contact}</td>
      <td>{props.donor.email}</td>
      <td>{props.donor.status}</td>
      <RenderButtons status={props.donor.status} deleteD={deleteDonor} updateD={updateDonor} />
    </tr>
  )
}


function BankDonor() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();

  const [isLoading, setLoading] = useState(true);  //for 1st loading data
  const [data, setData] = useState([]);


  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "BloodBank")
        history.push(`/${userLoginData.userData.type}`)

      const getData = async () => {
        const userResponse = await Axios.get(`http://localhost:5000/bloodRequest/getDonorsForBloodBank/${userLoginData.userData.user_id}`);

        setData(userResponse.data)
        setLoading(false);
      }
      getData();
    }
    catch {
      history.push('/')
    }

  }, [userLoginData])

  //after deleting data not updating thats why
  const updateState = async () => {
    const userResponse = await Axios.get(`http://localhost:5000/bloodRequest/getDonorsForBloodBank/${userLoginData.userData.user_id}`);
    setData(userResponse.data)
  }

  const showDonors = () => {
    return (
      data.map((currentDonor, index) => {
        //this is returning single donor row
        return <DonorRow donor={currentDonor} donor_id={currentDonor._id} index={index + 1} update={updateState} />
      })
    )
  }


  if (isLoading) {
    return (
      <BankContainer>
        <div className="box">
          <div className="loader">
            <span className="back">
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
      </BankContainer>

    )
  }

  return (
    <BankContainer>
      <div class="body">
        <h1>Blood Donors</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">DONOR NAME</th>
                <th scope="col">AGE</th>
                <th scope="col">BLOOD GROUP</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">CONTACT NO</th>
                <th scope="col">EMAIL</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {showDonors()}
            </tbody>
          </table>
        </div>
      </div>
    </BankContainer>
  )
}

export default BankDonor;

const BankContainer = styled.div`
.table{
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.15);
}
.thead{
    background-color:Black;
    color:white;
    font-weight:bold;
    font-size:15px;
    width:50%;
}
.table table-striped{
    width:50%;
}
.body{
    padding-left:20%;
    padding-right:10%;
    padding-top:3%;
}
tbody tr:last-of-type{
  border-bottom:2px solid black;
}
.btn,
btn-primary
 {
    margin-top: 10px;
    margin-bottom: 25px;
    position: relative;
}

.btn-primary{
    left: 0px;
    margin-left: 100px;
}
.btn-danger {
    left: 0px;
    margin-top: -90px;
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


`;