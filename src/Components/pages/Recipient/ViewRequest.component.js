import React, { useEffect, useContext, useState  } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios'

function RecipientRequests(){
  const { userLoginData } = useContext(UserContext)
  const [isLoading,setLoading]=useState(true);
  const history = useHistory();
  const [data,setData]=useState([]);
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

  },[userLoginData])
  if(isLoading)
  {
    return (
     
    <div class="d-flex justify-content-center">
    <div class="spinner-border text-danger" role="status" >
      <span class="sr-only">Loading...</span>
    </div>
  </div>

)}
    return (
      <RecipientContainer>
        <div class="body">
          <h1>Patient Requests</h1>
          <br/>
          <table class="table table-striped">
            <thead class="thead">
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
            {data.userDetails.map((result,index) => {
            return (
                 <tr>
                   <td>{index+1}</td>
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
      </RecipientContainer>
    )
  }
export default RecipientRequests;

const RecipientContainer = styled.div`
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
`;