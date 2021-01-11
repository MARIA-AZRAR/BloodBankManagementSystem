import React, { Component } from 'react';
import styled from 'styled-components';

class DonorDonations extends Component {
  render() {
    return (
      <DonorDonationsContainer>
        <div class="body">
          <h1>Your Donations</h1>
          <table class="table table-striped">
            <thead class="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">BLOOD BANK</th>
                <th scope="col">DATE</th>
                <th scope="col">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>abc</td>
                <td>10/11/2020</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>xyz</td>
                <td>09/11/2020</td>
                <td>2</td>
                </tr>
              <tr>
                <th scope="row">3</th>
                <td>mln</td>
                <td>12/11/2020</td>
                <td>1</td>
                  </tr>
              <tr>
                <th scope="row">4</th>
                <td>abc</td>
                <td>01/03/2020</td>
                <td>2</td>
                    </tr>
              <tr>
                <th scope="row">5</th>
                <td>jkl</td>
                <td>03/05/2020</td>
                <td>3</td>
                
                    </tr>
            </tbody>
          </table>
        </div>
      </DonorDonationsContainer>
    )
  }
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