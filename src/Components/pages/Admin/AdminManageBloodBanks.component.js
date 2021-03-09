import React, { useEffect, useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import UserContext from '../../../context/userDetailContext';
import Axios from 'axios';

function RenderButtons(props) {
    if (props.status === 'Active') {
        return (
            <td>
                <button type="button" class="btn btn-primary" onClick={props.updateD}>Update</button>
            </td>
        )
    }

    return (
        <td>
        </td>
    )
}


function BankRow(props) {

    const history = useHistory();

    const updateBank = (e) => {
        e.preventDefault();
        history.push('/Admin/BloodBank/ProfileEdit/' + props.bank_id);
    }

    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.bank.name}</td>
            <td>{props.bank.address}</td>
            <td>{props.bank.contact}</td>
            <td>{props.bank.email}</td>
            <td>{props.bank.status}</td>
            <RenderButtons status={props.bank.status} updateD={updateBank} />
        </tr>
    )
}


function AdminBloodBanks() {
    //to prevent from loading if user is log out
    const { userLoginData } = useContext(UserContext)
    const history = useHistory();

    const [isLoading, setLoading] = useState(true);  //for 1st loading data
    const [data, setData] = useState([]);


    useEffect(() => {
        if (!userLoginData.userData)
            history.push('/')
        try {
            if (userLoginData.userData.type !== "Admin")
                history.push(`/${userLoginData.userData.type}`)

            const getData = async () => {
                const userResponse = await Axios.get("http://localhost:5000/bloodRequest/getAdminBanks");

                setData(userResponse.data)
                setLoading(false);
            }
            getData();
        }
        catch {
            history.push('/')
        }

    }, [userLoginData])

    //after deleting data not updating thats why
    const updateState = async () => {
        const userResponse = await Axios.get("http://localhost:5000/bloodRequest/getAdminBanks");
        setData(userResponse.data)
    }

    const showBanks = () => {
        return (
            data.map((currentBank, index) => {
                //this is returning single donor row
                return <BankRow bank={currentBank} bank_id={currentBank._id} index={index + 1} update={updateState} />
            })
        )
    }


    if (isLoading) {
        return (
            <AdminBankContainer>
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
            </AdminBankContainer>

        )
    }

    return (
        <AdminBankContainer>
            <div class="body">
                <h1>Blood Banks</h1>
                <div className="table-responsive">
                    <table class="table table-striped">
                        <thead class="thead">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">BANK NAME</th>
                                <th scope="col">ADDRESS</th>
                                <th scope="col">CONTACT NO</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">STATUS</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showBanks()}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminBankContainer>
    )
}

export default AdminBloodBanks;

const AdminBankContainer = styled.div`
.table{
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.15);
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
tbody tr:last-of-type{
  border-bottom:2px solid black;
}
.btn,
btn-primary
 {
    margin-top: 10px;
    margin-bottom: 25px;
    position: relative;
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