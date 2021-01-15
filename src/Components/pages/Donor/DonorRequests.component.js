import React, { Component } from 'react';
import { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'

function DonorRequests() {

  const { userLoginData } = useContext(UserContext)
  const history = useHistory();

  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "Donor")
        history.push(`/${userLoginData.userData.type}`)
    }
    catch {
      history.push('/')
    }

  }, [userLoginData])
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
              <tr>
                <th scope="row">1</th>
                <td>abc</td>
                <td>A+</td>
                <td>01/10/2020</td>
                <td>12345678901</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>xyz</td>
                <td>A-</td>
                <td>02/11/2020</td>
                <td>12345678991</td>
                <td>2</td>
                </tr>
              <tr>
                <th scope="row">3</th>
                <td>nml</td>
                <td>B+</td>
                <td>05/10/2020</td>
                <td>12345678881</td>
                <td>3</td>
                  </tr>
              <tr>
                <th scope="row">4</th>
                <td>jkl</td>
                <td>AB+</td>
                <td>10/11/2020</td>
                <td>12345678976</td>
                <td>2</td>
                    </tr>
              <tr>
                <th scope="row">5</th>
                <td>lmn</td>
                <td>O-</td>
                <td>22/10/2020</td>
                <td>12345678921</td>
                <td>3</td>
                    </tr>
            </tbody>
          </table>
        </div>
      </DonorRequestsContainer>
    )
}
export default DonorRequests;

const DonorRequestsContainer = styled.div`
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