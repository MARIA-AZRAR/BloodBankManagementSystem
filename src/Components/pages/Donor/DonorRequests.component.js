import React, { Component } from 'react';
import { useState,useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios';
function DonorRequests() {

  const { userLoginData } = useContext(UserContext)
  const history = useHistory();
  const[data,setData]=useState([]);
  const [isLoading,setLoading]=useState(true);
//  let recData=[];
  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "Donor")
        history.push(`/${userLoginData.userData.type}`)
      Axios.get("http://localhost:5000/bloodRequest/getAllRec")
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
  if(isLoading){
    return (
      <DonorRequestsContainer>
      <div class="d-flex justify-content-center">
        <div className="spinnerl">
          <div class="spinner-border text-danger" role="status" >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </DonorRequestsContainer>
  )
  }
    return (
      <DonorRequestsContainer>
        <div class="body">
          <h1>Requests</h1>
          <table class="table table-striped">
            <thead class="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">RECIPIENT NAME</th>
                <th scope="col">BLOOD GROUP</th>
                <th scope="col">DUE DATE</th>
                <th scope="col">CONTACT NO</th>
                <th scope="col">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
            {data.request.map((result,index) => {
            return (
             
                 <tr>
                   <td>{index+1}</td>
                   <td>{data.recipient[index].name}</td>
                  <td>{result.bloodGroup}</td>
                  <td>{(new Date(result.due_date)).toLocaleString().split(',')[0]}</td>
                  <td>{data.recipient[index].contact}</td>
                  <td>{result.quantity}</td>
                </tr>
               
            )
          })}
            </tbody>
          </table>
        </div>
      </DonorRequestsContainer>
    )
}
export default DonorRequests;

const DonorRequestsContainer = styled.div`

.spinnerl{
  padding-top:150px;
  padding-bottom:150px;
  
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

`;