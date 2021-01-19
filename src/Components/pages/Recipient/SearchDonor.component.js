import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext';
import Axios from 'axios';
import { bloodGroups } from '../../../context/BloodGroupsList';

function SearchDonor() {
  const { userLoginData } = useContext(UserContext)
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "Recipient")
        history.push(`/${userLoginData.userData.type}`)

      Axios.get("http://localhost:5000/bloodRequest/getAllDonors")
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
  if (isLoading) {
    return (

      <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" role="status" >
          <span class="sr-only">Loading...</span>
        </div>
      </div>

    )
  }
  return (
    <RecipientContainer>
      <div class="body">
        <h1>Search Donors</h1>
        <div className="search-donor">
          <h5>Search Blood Group:   
            <select id="blood" className="selectB" name="bloodGroup" onChange={(event) => { setSearch(event.target.value) }} >
              <option></option>
              {bloodGroups.map(item => {
                return (
                  <option value={item}>{item}</option>
                )
              })}
            </select>
          </h5>
          <p id="demo"></p>
        </div>
        <br />
        <br />
        <table class="table table-striped" id="myTable">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DONOR NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">AGE</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">CONTACT</th>
              <th scope="col">BLOOD BANK</th>

            </tr>
          </thead>
          <tbody>
            {data.donor.filter((val) => {
              if (search == "") {
                return val;
              } else {

                if (val.bloodGroup == search) {
                  return val;
                }
              }
            }).map((result, index) => {

              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.age}</td>
                  <td>{result.bloodGroup}</td>
                  <td>{result.address}</td>
                  <td>{result.contact}</td>
                  <td>{result.bloodBank}</td>
                </tr>

              )
            })}
          </tbody>
        </table>
      </div>
    </RecipientContainer>
  )
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

h5{
  padding-right: 5rem;
}

h6{
    padding-left:60%;   
}
input{
    text-align:center;
    width:40%;
}



`;