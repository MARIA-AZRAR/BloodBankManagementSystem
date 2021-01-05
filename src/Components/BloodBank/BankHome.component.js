import React, { Component } from 'react';
import styled from 'styled-components';

class BankHome extends Component {
  render() {
    return (
      <HomeContainer>
        <div class="body">
          <h1>Alerts</h1>
          <p>Less than 10% stock of B+ remain</p>

          <table class="table table-striped">
            <thead class="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">BLOOD GROUP</th>
                <th scope="col">DATE DONATED</th>
                <th scope="col">DATE EXPIRED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>abc</td>
                <td>B+</td>
                <td>11/02/2019</td>
                <td>11/02/2020</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>xyz</td>
                <td>A+</td>
                <td>11/03/2019</td>
                <td>11/03/2020</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>klm</td>
                <td>AB+</td>
                <td>11/04/2019</td>
                <td>11/04/2020</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>123</td>
                <td>O-</td>
                <td>11/05/2019</td>
                <td>11/05/2020</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>mnh</td>
                <td>A-</td>
                <td>11/05/2019</td>
                <td>11/05/2020</td>
              </tr>
            </tbody>
          </table>
        </div>
      </HomeContainer>
    )
  }
}
export default BankHome;

const HomeContainer = styled.div`
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