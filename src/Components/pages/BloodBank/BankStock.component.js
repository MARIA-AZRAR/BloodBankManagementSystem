import React, { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'


function BankStock() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();

  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "BloodBank")  //to prevent accessing any other type
        history.push(`/${userLoginData.userData.type}`)
    }
    catch {
      history.push('/')
    }
  }, [userLoginData])

  return (
    <BankContainer>
      <div class="body">
        <h1>Blood Stock</h1>


        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DONOR NAME</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">DATE DONATED</th>
              <th scope="col">QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>abc</td>
              <td>B+</td>
              <td>20/11/2020</td>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>xyz</td>
              <td>A+</td>
              <td>21/11/2020</td>
              <td>2</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>123</td>
              <td>A-</td>
              <td>23/11/2020</td>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>mln</td>
              <td>B+</td>
              <td>25/11/2020</td>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>klm</td>
              <td>A+</td>
              <td>27/11/2020</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
        <h6>Total Quantity:  <input type="text" id="myText" value="7" /></h6>
        <h2>Blood Quantity</h2>
        <div className="Bottom">
          <h5>Select Blood Group:</h5>
          <select id="blood" name="bloodGroup">
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="O-">O-</option>
          </select>
          <br />
          <input type="text"
            id="myText"
            value="20" />
        </div>
      </div>
    </BankContainer>
  )
}

export default BankStock;

const BankContainer = styled.div`
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

.Bottom{
  padding-left:70%;  
}
h2{
    color:#6B1A08;
    padding-left:65%;
    font-weight:bold;
}
h6{
    padding-left:60%;   
}
input{
    text-align:center;
    width:40%;
}
`;