import React, { Component } from 'react';
import styled from 'styled-components';

class SearchDonor extends Component {
  render() {
    return (
      <RecipientContainer>
        <div class="body">
          <h1>Search Donors</h1>
<div className="search-donor">
            <h5>SearchDonor Blood Group:      
            <select id="blood" name="bloodGroup">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="O-">O-</option>
            </select>
            </h5>
          </div>
          <br/>
            <br/>
          <table class="table table-striped">
            <thead class="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">DONOR NAME</th>
                <th scope="col">AGE</th>
                 <th scope="col">BLOOD GROUP</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">CONTACT</th>
                <th scope="col">BLOOD BANK</th>
                <th scope="col">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>abc</td>
                <td>30</td>
                <td>B+</td>
                <td>abc</td>
                <td>03001456789</td>
                <td>abcd</td>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>abc</td>
                <td>32</td>
                <td>A-</td>
                <td>abc</td>
                <td>03001406089</td>
                <td>abd</td>
                <td>2</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>abcd</td>
                <td>32</td>
                <td>A-</td>
                <td>abce</td>
                <td>03006406089</td>
                <td>abd</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </RecipientContainer>
    )
  }
}
export default SearchDonor;

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

.search-donor{
  padding-left:50%; 
}
#blood{
    space-between:evenly;
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