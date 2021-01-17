import React, { Component } from 'react';
import { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext';
import Axios from "axios";

function DonorDonations() {
  const { userLoginData } = useContext(UserContext)
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [bloodBank, setBloodBank] = useState("");

  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "Donor")
        history.push(`/${userLoginData.userData.type}`)


      Axios.get(`http://localhost:5000/donation/blood/${userLoginData.userData.bloodBank_id}`)
        .then((response) => {
          setBloodBank(response.data);
        })

      Axios.get(`http://localhost:5000/donation/${userLoginData.userData.user_id}`)
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

  if(isLoading)
  {
    return (

    <div class="d-flex justify-content-center">
    <div class="spinner-border text-danger" role="status" >
      <span class="sr-only">Loading...</span>
    </div>
  </div>

)
  }
    return (
      <DonorDonationsContainer>
        <div class="body">
          <h1>Your Donations</h1>

          <table class="table table-striped">
            <thead class="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">BANK</th>
                <th scope="col">DATE</th>
                <th scope="col">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
            {data.banks.map((result,index) => {

            return (

                 <tr>
                   <td>{index+1}</td>
                   <td>{bloodBank.bank}</td>
                  <td>{(new Date(result.created_at)).toLocaleString().split(',')[0]}</td>
                  <td>{result.quantity}</td>
                </tr>

            )
          })}
            </tbody>
          </table>

        </div>


      </DonorDonationsContainer>
    )
}
export default DonorDonations;
const DonorDonationsContainer = styled.div`
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