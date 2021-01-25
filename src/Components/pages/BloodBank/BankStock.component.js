import React, { useState,useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios';
import { bloodGroups } from '../../../context/BloodGroupsList';

function BankStock() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [data,setData]=useState([]);
  const [search,setSearch]=useState('');

  function countQuantity(){
    var c=0;
    for(var i=0;i<data.bank.length;i++)
    {
        c=c+data.bank[i].quantity;
    }
   return c;
  }
  function countAll()
  {
    var c=0;
    for(var i=0;i<data.bank.length;i++)
    {  if(search=='')
    {
    c=0;
    }
       if(data.bank[i].bloodGroup==search)
        {c=c+data.bank[i].quantity;}
    }
   return c;
  }
  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      if (userLoginData.userData.type !== "BloodBank")  //to prevent accessing any other type
        history.push(`/${userLoginData.userData.type}`)
      
        Axios.get(`http://localhost:5000/bloodBag/getBags/${userLoginData.userData.user_id}`)
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

      <BankContainer>
        <div class="d-flex justify-content-center">
          <div className="spinnerl">
            <div class="spinner-border text-danger" role="status" >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </BankContainer>

    )
  }
  return (
    <BankContainer>
      <div class="body">
        <h1>Blood Stock</h1>


        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">DATE DONATED</th>
              <th scope="col">QUANTITY</th>
            </tr>
          </thead>
          <tbody>
          {data.bank.map((result, index) => {
          return (
          <tr>
           <td>{index + 1}</td>
          <td>{result.bloodGroup}</td>
          <td>{(new Date(result.created_at).toLocaleString().split(',')[0])}</td>
          <td>{result.quantity}</td>
         </tr>

)
})}
          </tbody>
        </table>
        <h6>Total Quantity:  <input type="text" id="myText" value={countQuantity()} /></h6>
        <h2>Blood Quantity</h2>
        <div className="Bottom">
          <h5>Select Blood Group:</h5>
          <select id="blood" className="selectB" name="bloodGroup" onChange={(event) => { setSearch(event.target.value) }}>
              <option> </option>
              {bloodGroups.map(item => {
                return (
                  <option value={item}>{item}</option>
                )
              })}
            </select>
          <br />
          <input type="text"
            id="myText"
            value={countAll()} />
        </div>
      </div>
    </BankContainer>
  )
}

export default BankStock;

const BankContainer = styled.div`
.spinnerl{
  padding-top:150px;
  padding-bottom:150px; 
}
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