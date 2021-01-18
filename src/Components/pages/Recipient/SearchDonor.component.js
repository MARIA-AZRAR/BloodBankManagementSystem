import React, { useEffect, useContext, useState  } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios'
function SearchDonor(){  
  const { userLoginData } = useContext(UserContext)
  const [isLoading,setLoading]=useState(true);
  const history = useHistory();
  const [data,setData]=useState([]);
  //const [search,setSearch]=useState('');
  //const [filterData,setFilterData]=useState([]);
//  function Search(){
    
    //var input=document.getElementById("blood");
   /* var input="B+";
    var filter = input;
    var table=document.getElementById("myTable");
    var  tr = table.getElementsByTagName("tr");
    for(var i=0;i<tr.length;i++)
    {
      var td=tr[i].getElementsByTagName("td")[3];
      if(td)
      {
        var txt=td.textContent||td.innerText;
        if (txt.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }*/
  //}
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

  },[userLoginData])
 /*useEffect(()=>{
setFilterData(
  data.donor.filter(data=>{ return data.donor.bloodGroup.toLowerCase().
    includes(search.toLowerCase())})
)

 },[search,data])*/
  if(isLoading)
  {
    return (
     
    <div class="d-flex justify-content-center">
    <div class="spinner-border text-danger" role="status" >
      <span class="sr-only">Loading...</span>
    </div>
  </div>

)}
    return (
      <RecipientContainer>
        <div class="body">
          <h1>Search Donors</h1>
<div className="search-donor">
            <h5>SearchDonor Blood Group:     
            <select id="blood" name="bloodGroup" >
            <option selected disabled>Choose here</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
            </select>
            </h5>
            <p id="demo"></p>
          </div>
          <br/>
            <br/>
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
            {data.donor.map((result,index) => {
            
            return (
                 <tr>
                   <td>{index+1}</td>
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
h6{
    padding-left:60%;   
}
input{
    text-align:center;
    width:40%;
}
`;