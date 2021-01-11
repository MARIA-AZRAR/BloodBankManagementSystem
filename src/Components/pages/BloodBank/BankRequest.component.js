import React, { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'


function BankRequests() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();

  useEffect(() => {
    if (!userLoginData.userData)
     
    try{
    if (userLoginData.userData.type !== "BloodBank")  //to prevent accessing any other type
      history.push(`/${userLoginData.userData.type}`)
    }
    catch{
      history.push('/')
    }


  }, [userLoginData])

  return (
    <BankContainer>
      <div class="body">
        <h1>Patient Requests</h1>
        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">RECIPIENT NAME</th>
              <th scope="col">AGE</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">CONTACT NO</th>
              <th scope="col">BLOOD BANK</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>xyz</td>
              <td>20</td>
              <td>A-</td>
              <td>22 Street House No 1</td>
              <td>12345678909</td>
              <td>H Bank</td>
              <td>1</td>
              <td>Pending</td>
              <td>
                <button type="button" class="btn btn-success">Donate</button></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>abc</td>
              <td>21</td>
              <td>B-</td>
              <td>22 Street House No 2</td>
              <td>12345678906</td>
              <td>B Bank</td>
              <td>2</td>
              <td>Pending</td>
              <td>
                <button type="button" class="btn btn-success">Donate</button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>123</td>
              <td>25</td>
              <td>A+</td>
              <td>22 Street House No 3</td>
              <td>12345678907</td>
              <td>C Bank</td>
              <td>1</td>
              <td>Complete</td>
              <td>
                <button type="button" class="btn btn-success">Donate</button></td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>mln</td>
              <td>26</td>
              <td>AB+</td>
              <td>22 Street House No 4</td>
              <td>12345678989</td>
              <td>C Bank</td>
              <td>1</td>
              <td>Complete</td>
              <td>
                <button type="button" class="btn btn-success">Donate</button></td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>jkl</td>
              <td>20</td>
              <td>A-</td>
              <td>22 Street House No 5</td>
              <td>12345677709</td>
              <td>D Bank</td>
              <td>1</td>
              <td>Pending</td>
              <td>
                <button type="button" class="btn btn-success">Donate</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </BankContainer>
  )
}

export default BankRequests;

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
`;