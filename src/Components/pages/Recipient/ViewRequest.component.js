import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios'

function RecipientRequests() {
  const { userLoginData } = useContext(UserContext)
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "Recipient")
        history.push(`/${userLoginData.userData.type}`)

      Axios.get(`http://localhost:5000/bloodRequest/viewRequests/${userLoginData.userData.user_id}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error)
        })

    }
    catch {
      history.push('/')
    }

  }, [userLoginData])
  if (isLoading) {
    return (
      <RecipientContainer>
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
      </RecipientContainer>

    )
  }
  return (
    <RecipientContainer>
      <div className="body">
        <h1>Patient Requests</h1>
        <br />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">RECIPIENT NAME</th>
                <th scope="col">AGE</th>
                <th scope="col">BLOOD GROUP</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">BLOOD BANK</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">STATUS</th>
                <th scope="col">DUE DATE</th>
              </tr>
            </thead>
            <tbody>
              {data.userDetails.map((result, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.recipient[0].name}</td>
                    <td>{data.recipient[0].age}</td>
                    <td>{result.bloodGroup}</td>
                    <td>{result.address}</td>
                    <td>{data.recipient[0].bloodBank}</td>
                    <td>{result.quantity}</td>
                    <td>{data.status[index]}</td>
                    <td>{(new Date(result.due_date)).toLocaleString().split(',')[0]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </RecipientContainer>
  )
}
export default RecipientRequests;

const RecipientContainer = styled.div`

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