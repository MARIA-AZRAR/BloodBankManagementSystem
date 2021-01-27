import React, { useState,useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios';
import { bloodGroups } from '../../../context/BloodGroupsList';
import Swal from 'sweetalert2';

function AdminStock() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [data,setData]=useState([]);
  const [search,setSearch]=useState('');

  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
     // if (userLoginData.userData.type !== "BloodBank")  //to prevent accessing any other type
       // history.push(`/${userLoginData.userData.type}`)
        history.push("/Admin/Request");
        Axios.get("http://localhost:5000/bloodRequest/getAdminRequest")
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

 const deleteRequest = async (del) => {
   //  alert(`${del}`);
    await Axios.get(`http://localhost:5000/bloodRequest/deleteRequest/${del}`)
    console.log("deleted");
    Swal.fire(
      'Deleted',
      'success'
  ) 
  await Axios.get("http://localhost:5000/bloodRequest/getAdminRequest")
  .then((response) => {
    setData(response.data);})

  }
  if (isLoading) {
    return (

      <AdminContainer>
        <div class="d-flex justify-content-center">
          <div className="spinnerl">
            <div class="spinner-border text-danger" role="status" >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </AdminContainer>

    )
  }
  return (
    <AdminContainer>
      <div class="body">
        <h1>Blood Stock</h1>


        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">RECIPIENT NAME</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">DATE DONATED</th>
              <th scope="col">BLOOD BANK</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
          {data.map((result, index) => {
          return (
          <tr>
           <td>{index + 1}</td>
           <td>{result.name}</td>
          <td>{result.bloodGroup}</td>
          <td>{(new Date(result.dateDonated).toLocaleString().split(',')[0])}</td>
          <td>{result.bloodBank}</td>
          <td>{result.address}</td>
          <td>{result.quantity}</td>
          <td>{result.status}</td>
          <td><button type="button" class="btn btn-danger" onClick={()=>deleteRequest(result.id)}>Delete</button></td>
         </tr>

)
})}
          </tbody>
        </table>
      </div>
    </AdminContainer>
  )
}

export default AdminStock;

const AdminContainer = styled.div`
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