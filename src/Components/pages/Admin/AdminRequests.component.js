import React, { useState, useEffect, useContext } from "react";
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
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

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
        setData(response.data);
      })

  }
  if (isLoading) {
    return (

      <AdminContainer>
        <div class="box">
          <div class="loader">
            <span class="back">
              <span>L</span>
              <span>O</span>
              <span>A</span>
              <span>D</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
            </span>
          </div>
        </div>
      </AdminContainer>

    )
  }
  return (
    <AdminContainer>
      <div class="body">
        <h1>Blood Requests</h1>


        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">RECIPIENT NAME</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">DATE REQUESTED</th>
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
                  <td><button type="button" class="btn btn-danger" onClick={() => deleteRequest(result.id)}>Delete</button></td>
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

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

 
.box{
    background: none;
    margin-top: 200px;
	padding-top:300px;
}

.loader{
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}​
	.back {
		margin:1em auto;
	}
	.back span {
		font-size:3em;
		color:#F2C640;;
		background: #e02525;
		display:table-cell;
		box-shadow:inset 0 0 5px rgba(0,0,0,0.3), 0 5px 0 #ccc;
		padding: 0 15px;
		line-height: 100px;
		animation:jumb 2s infinite;
	}
	@keyframes jumb {
		0% {
			transform:translateY(0px)
		}
		50% {
			transform:translateY(-30px);
			box-shadow:0 15px 0 #F2C640;
		}
		100% {
			transform:translateY(0px)	
		}
	}
	.back span:nth-child(1) {
		animation-delay:0s;
	}
	.back span:nth-child(2) {
		animation-delay:.1s;	
	}
	.back span:nth-child(3) {
		animation-delay:.2s;
	}
	.back span:nth-child(4) {
		animation-delay:.3s;	
	}
	.back span:nth-child(5) {
		animation-delay:.4s;
	}
	.back span:nth-child(6) {
		animation-delay:.5s;	
	}
	.back span:nth-child(7) {
		animation-delay:.6s;
	}
`;