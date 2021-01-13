import React, { useState, useEffect } from 'react';  //useEffect will run exactly 1 time 
//when component loaded or each time component has been switched 

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from 'axios';

//Blood Bank
import BankHome from './Components/pages/BloodBank/BankHome.component';
import BankDonor from './Components/pages/BloodBank/BankDonor.component';
import BankReciever from './Components/pages/BloodBank/BankReciever.component';
import BankRequest from './Components/pages/BloodBank/BankRequest.component';
import BankStock from './Components/pages/BloodBank/BankStock.component';

import Login from './Components/auth/login-form.component';
import LoginAdmin from './Components/auth/login-form-admin.component';
import SignupBloodBank from './Components/auth/signup-form-bloodBank.component';
import SignupDonor from './Components/auth/signup-form-Donor.component';
import SignupRecipinet from './Components/auth/signup-form-Recipient.component';

//import Navbar from './Components/navbar.component';
import Header from './Components/layout/Header.component';
import Footer from './Components/layout/Footer.component';
import Navbar from './Components/layout/Navbar'

//extras
import UserContext from './context/userDetailContext';

//Donor

import DonorDonations from './Components/pages/Donor/DonorDonations.component';
import DonorRequests from './Components/pages/Donor/DonorRequests.component';
import DonorMakeDonations from './Components/pages/Donor/DonorMakeDonations.component';
import DonorProfile from './Components/pages/Donor/DonorProfile.component';


//Recipient


import RecipientSendRequest from './Components/pages/Recipient/SendRequest.component';
import SearchDonor  from './Components/pages/Recipient/SearchDonor.component';
import RecipientRequests from './Components/pages/Recipient/ViewRequest.component';
import RecipientProfile from './Components/pages/Recipient/RecipientProfile.component';



function App() {

  const [userLoginData, setUserLoginData] = useState({  //this state will store the user data needed in all app like id
    token: undefined,
    userData: undefined,
  });

  //now we need to get the token from the session if any and check if its valid or not to login the user
  useEffect(() => {  //useEffect needs arrow func which can't be async 
    const checkUserLogin = async () => {  //data is required to be accssed from backend so async thats why another fun is created in usecase arroe func
      let sessionToken = localStorage.getItem("auth-token"); //if no key with this name w'll get a null in session token
         console.log(sessionToken);
      if (sessionToken === null) {  //a null session token can erase error at the backend 
        localStorage.setItem("auth-token", "")  //adding key in local storage & value will be given later
        sessionToken = ""   //so assigning it the empty string
      }
      //now checkiing if user is logged in by giving a post request to if token is valid
      const tokenResponse = await Axios.post(
        "http://localhost:5000/login/IsValidToken",
        null,
        {
          headers: { "auth-token": sessionToken }
        });  //data is null but it has a header which will have a token

      if (tokenResponse.data) {  //true if user logged in
        const userResponse = await Axios.get("http://localhost:5000/login/", {
          headers: { "auth-token": sessionToken }
        });

        setUserLoginData({
          sessionToken,
          userData: userResponse.data,
        });
      }
    }

    checkUserLogin();
  }, []) //[] empty array means this useEffect will run exactly one time

  //          <Route path="/" component={Sidebar} />
  //          <Route path="/BloodBank" component={BankNavbar} />
  //          <Route path="/" exact component={Navbar} />



  return (
    <>
      <Header />
      <UserContext.Provider value={{ userLoginData, setUserLoginData }}>
        <Router>
          <Navbar />
          <Route path="/signup" exact component={SignupBloodBank} />
          <Route path="/signup-donor" exact component={SignupDonor} />
          <Route path="/signup-recipient" exact component={SignupRecipinet} />
          <Route path="/Admin" exact component={LoginAdmin} />
          <Route path="/signin" exact component={Login} />
          <Route path="/BloodBank" exact component={BankHome} />
          <Route path="/BloodBank/Donor" exact component={BankDonor} />
          <Route path="/BloodBank/Reciever" exact component={BankReciever} />
          <Route path="/BloodBank/Request" exact component={BankRequest} />
          <Route path="/BloodBank/Stock" exact component={BankStock} />

    
          <Route path="/Donor" exact component={DonorDonations} />
          <Route path="/Donor/Requests" exact component={DonorRequests} />
          <Route path="/Donor/MakeDonations" exact component={DonorMakeDonations} />
          <Route path="/Donor/Profile" exact component={DonorProfile} />

          <Route path="/Recipient" exact component={RecipientSendRequest} />
          <Route path="/Recipient/Requests" exact component={RecipientRequests} />
          <Route path="/Recipient/SearchDonor" exact component={SearchDonor} />
          <Route path="/Recipient/Profile" exact component={RecipientProfile} />
        </Router>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;

//        


//import './App.css';



/*
 <Navbar />
      <SignupBloodBank />
      <Login/>
      <LoginAdmin />
*/