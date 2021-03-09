import React, { useEffect, useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext';
import Axios from 'axios';
import Swal from 'sweetalert2';
import ErrorNotice from '../../misc/ErrorNotice';



function RenderButtons(props) {
  if (props.status === 'Active') {
    return (
      <td>
        <button type="button" class="btn btn-success" onClick={props.Donate}>Donate</button>
      </td>
    )
  }

  return (
    <td>
    </td>
  )
}


function RequestRow(props) {
  const { userLoginData } = useContext(UserContext);

  const Donate = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`http://localhost:5000/bloodBag/CompleteDonation/${userLoginData.userData.user_id}`, {
        id: props.request_id,
        bloodGroup: props.request.bloodGroup,
        quantity: props.request.quantity
      });
      Swal.fire(
        'Completed',
        'yayy! Successfully Donated',
        'success'
      )
    } catch (err) {
      err.response.data.msg && props.setError(err.response.data.msg);
    }
    props.update();
  }

  return (
    <tr>
      <th scope="row">{props.index}</th>
      <td>{props.request.recipient_name}</td>
      <td>{props.request.age} </td>
      <td>{props.request.bloodGroup}</td>
      <td>{props.request.address}</td>
      <td>{props.request.contact}</td>
      <td>{props.request.quantity}</td>
      <td>{props.request.status}</td>
      <RenderButtons status={props.request.status} Donate={Donate} />
    </tr>
  )
}


function BankRequests() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setErr] = useState();


  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "BloodBank")  //to prevent accessing any other type
        history.push(`/${userLoginData.userData.type}`)


      //get data
      const getData = async () => {
        const requestResponse = await Axios.get(`http://localhost:5000/bloodRequest/getAllRequests/${userLoginData.userData.user_id}`);
        setData(requestResponse.data);
        setLoading(false);
      }
      getData();

    }
    catch {
      history.push('/')
    }


  }, [userLoginData])


  const setError = (err) => {
    setErr(err);
  }

  //after deleting data not updating thats why
  const updateState = async () => {
    const requestResponse = await Axios.get(`http://localhost:5000/bloodRequest/getAllRequests/${userLoginData.userData.user_id}`);
    setData(requestResponse.data)
  }

  const showRequests = () => {
    return (
      data.map((currentRequest, index) => {
        //this is returning single donor row
        return <RequestRow request={currentRequest} request_id={currentRequest._id} index={index + 1} update={updateState} setError={setError} />
      })
    )
  }

  if (isLoading) {
    return (
      <BankContainer>
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
      </BankContainer>

    )
  }

  return (
    <BankContainer>
      <div class="body">
        <h1>Patient Requests</h1>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <div className="table-responsive">
          <table class="table table-striped">
            <thead class="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">RECIPIENT NAME</th>
                <th scope="col">AGE</th>
                <th scope="col">BLOOD GROUP</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">CONTACT NO</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {showRequests()}
            </tbody>
          </table>
        </div>
      </div>
    </BankContainer>
  )
}

export default BankRequests;

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