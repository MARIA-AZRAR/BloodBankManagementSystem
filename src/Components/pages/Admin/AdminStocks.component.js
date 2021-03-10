import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext'
import Axios from 'axios';
import { bloodGroups } from '../../../context/BloodGroupsList';

function AdminStock() {
  //to prevent from loading if user is log out
  const { userLoginData } = useContext(UserContext)
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  function countQuantity() {
    var c = 0;
    for (var i = 0; i < data.length; i++) {
      c = c + data[i].quantity;
    }
    return c;
  }
  function countAll() {
    var c = 0;
    for (var i = 0; i < data.length; i++) {
      if (search == '') {
        c = 0;
      }
      if (data[i].bloodGroup == search) { c = c + data[i].quantity; }
    }
    return c;
  }
  useEffect(() => {
    if (!userLoginData.userData)
      history.push('/')
    try {
      // if (userLoginData.userData.type !== "BloodBank")  //to prevent accessing any other type
      // history.push(`/${userLoginData.userData.type}`)
      history.push("/Admin/Stock");
      Axios.get("http://localhost:5000/bloodBag/getAdminBags")
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
        <h1>Blood Stock</h1>


        <table class="table table-striped">
          <thead class="thead">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">BLOOD GROUP</th>
              <th scope="col">DATE DONATED</th>
              <th scope="col">BLOOD BANK</th>
              <th scope="col">QUANTITY</th>
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
                  <td>{result.quantity}</td>
                </tr>

              )
            })}
          </tbody>
        </table>
       
        <div className="bottomHeader">
        <span class="label danger">Check Blood Quantity</span>
        </div>
        <div className="flex-container">
       
          <select className="browser-default custom-select" onChange={(event) => { setSearch(event.target.value) }}>
            <option>Select Blood Group </option>
            {bloodGroups.map(item => {
              return (
                <option value={item}>{item}</option>
              )
            })}
              
          
          </select>
          <div className="bCount">
          <input type="text"
            id="myText"
            value={countAll()} /></div>
            <div className="totalQuantity">
        <span class="label info">Total Blood Quantity</span> <input type="text"  value={countQuantity()} />
        </div> 
            </div>
         
        </div>
        
    </AdminContainer>
  )
}

export default AdminStock;

const AdminContainer = styled.div`

.flex-container {
  display: flex;
 
}

select{
  width:27%;
  height:20%;
  border-color: #8886BB;
  border-width:0.2em
}
input{
  
  text-align:center;
  width:30%;
  height:100%;
  border: 3px solid #441423;
  border-radius: 4px;
}
.bCount{
  padding-left:1%;
 
}
.spinnerl{
  padding-top:150px;
  padding-bottom:150px; 
}
}
.totalQuantity{
  padding-left:30%;
  
}

.label {
  color: white;
  padding: 8px;
}
.info {background-color: #450A38;}
.danger{
  color: #473633;
  font-weight:bolder;
  font-size:25px;
  font-family: sans-serif, "Helvetica Neue", "Lucida Grande", Arial;
  text-shadow: 1px 1px #FF0000
  
}
.bottomHeader{
  padding-bottom:1%;

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