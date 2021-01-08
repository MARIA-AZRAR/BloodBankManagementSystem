import React, { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'


function BankDonor() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();

  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')

    if (userLoginData.userData.type !== "BloodBank")
      history.push(`/${userLoginData.userData.type}`)

  }, [userLoginData])

  return (
    <BankContainer>
      <div class="body">
        <h1>Blood Donors</h1>
        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DONOR NAME</th>
              <th scope="col">AGE</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">CONTACT NO</th>
              <th scope="col">DATE DONATED</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>abc</td>
              <td>20</td>
              <td>A+</td>
              <td>22 Street House No 1</td>
              <td>12345678901</td>
              <td>20/11/2020</td>
              <td>1</td>
              <td>Active</td>
              <td>
                <button type="button" class="btn btn-primary">Update</button>
                <br />
                <button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>xyz</td>
              <td>21</td>
              <td>B+</td>
              <td>22 Street House No 2</td>
              <td>12345678900</td>
              <td>20/12/2020</td>
              <td>2</td>
              <td>Active</td>
              <td>
                <button type="button" class="btn btn-primary">Update</button>
                <br />
                <button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>mln</td>
              <td>22</td>
              <td>A-</td>
              <td>22 Street House No 3</td>
              <td>12345678908</td>
              <td>21/12/2020</td>
              <td>2</td>
              <td>Active</td>
              <td>
                <button type="button" class="btn btn-primary">Update</button>
                <br />
                <button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>123</td>
              <td>25</td>
              <td>B-</td>
              <td>22 Street House No 4</td>
              <td>12345678909</td>
              <td>23/11/2020</td>
              <td>2</td>
              <td>Active</td>
              <td>
                <button type="button" class="btn btn-primary">Update</button>
                <br />
                <button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>jkl</td>
              <td>23</td>
              <td>AB+</td>
              <td>22 Street House No 5</td>
              <td>12345678905</td>
              <td>20/11/2020</td>
              <td>1</td>
              <td>Active</td>
              <td>
                <button type="button" class="btn btn-primary">Update</button>
                <br />
                <button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </BankContainer>
  )
}

export default BankDonor;

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