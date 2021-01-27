import React, { useState,useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios';


function AdminAlert() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [data,setData]=useState([]);
  const [alert, setAlert] = useState([]);
 


  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
     // if (userLoginData.userData.type !== "BloodBank")  //to prevent accessing any other type
       // history.push(`/${userLoginData.userData.type}`)
         
         const getData = async () => {
          
         await Axios.get("http://localhost:5000/bloodBag/getAdminAlerts")
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          })
         await Axios.get(`http://localhost:5000/bloodBag/Alerts/${userLoginData.userData.user_id}`)
          .then((response) => {
            setAlert(response.data);

            setLoading(false);
          })
          .catch((error) => {
            console.log(error)
          })
      }

      getData();

    }
    
    catch {
      history.push('/')
      //get data
      //     const getData = async () => {
      //     const requestResponse = await 
      //   }
      //   getData();
      // }
    }
  }, [userLoginData])


   const alerts = () => {
    return (
      alert.map((item) => {
        return (
          <p class="alerts">No Stock of {item} is present</p>
        )
      })
    )
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
           <h1>Alerts</h1>
        {alerts()}
        <h1>Expired Bags</h1>


        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">DATE DONATED</th>
              <th scope="col">BLOOD BANK</th>
              <th scope="col">DATE EXPIRED</th>
            </tr>
          </thead>
          <tbody>
          {data.map((result, index) => {
          return (
          <tr>
           <td>{index + 1}</td>
          <td>{result.bloodGroup}</td>
          <td>{(new Date(result.dateDonated).toLocaleString().split(',')[0])}</td>
          <td>{result.name}</td>
          <td>{(new Date(result.dateExpired).toLocaleString().split(',')[0])}</td>
         </tr>

)
})}
          </tbody>
        </table>
      </div>
    </AdminContainer>
  )
}

export default AdminAlert;

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

.alerts{
    font-size:18px;
    font-style:italic;
    color:red;
    font-weight:bold;
    margin-bottom: 15px;
    padding:3px;

}

`;