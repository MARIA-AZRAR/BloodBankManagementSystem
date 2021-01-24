import React, {Component,useState,useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from "axios";


function BankHome() {

  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const [data, setData] = useState([]);


  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
try{
        if (userLoginData.userData.type !== "BloodBank")  //to prevent accessing any other type
        history.push(`/${userLoginData.userData.type}`)
         Axios.get("http://localhost:5000/bloodBag/getBags")
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

      <HomeContainer >
        <div class="d-flex justify-content-center">
          <div className="spinnerl">
            <div class="spinner-border text-danger" role="status" >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </HomeContainer >

    )
   }

  return (
    <HomeContainer>
      <div class="body">
        <h1>Alerts</h1>
        <p>Less than 10% stock of B+ remain</p>

        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">DATE DONATED</th>
              <th scope="col">DATE EXPIRED</th>
            </tr>
          </thead>
          <tbody>
                {data.bag.map((result, index) => {
          return (
          <tr>
           <td>{index + 1}</td>
          <td>{result.bloodGroup}</td>
          <td>{(new Date(result.created_at).toLocaleString().split(',')[0])}</td>
          <td>{(new Date(result.expiry_date).toLocaleString().split(',')[0])}</td>
         </tr>
)
})}
          </tbody>
        </table>
      </div>
    </HomeContainer>
  )
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