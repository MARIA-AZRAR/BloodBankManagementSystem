import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

//Blood Bank
import BankHome from './Components/BloodBank/BankHome.component';
import BankNavbar from './Components/BloodBank/BankNavbar.component';
import BankDonor from './Components/BloodBank/BankDonor.component';
import BankReciever from './Components/BloodBank/BankReciever.component';
import BankRequest from './Components/BloodBank/BankRequest.component';
import BankStock from './Components/BloodBank/BankStock.component';
import Sidebar from './Components/Sidebar.component';

import Login from './Components/login-form.component';
import LoginAdmin from './Components/login-form-admin.component';
import SignupBloodBank from './Components/signup-form-bloodBank.component';

import Navbar from './Components/navbar.component';
import Header from './Components/Header.component';
import Footer from './Components/Footer.component';



function App() {
  return (
    <div>
      <Header />
      <Router>
        <Route path="/signup" exact component = {SignupBloodBank} />
        <Route path = "/Admin" exact component={LoginAdmin} />
        <Route path = "/" exact component = {Navbar} />
        <Route path = "/signin" exact component = {Login} />
        <Route path= "/BloodBank" component={BankNavbar} /> 
        <Route path = "/BloodBank" component = {Sidebar} />
        <Route path= "/BloodBank" exact component={BankHome} />
        <Route path= "/BloodBank/Donor" exact component={BankDonor} />
        <Route path= "/BloodBank/Reciever" exact component={BankReciever} />
        <Route path= "/BloodBank/Request" exact component={BankRequest} />
        <Route path= "/BloodBank/Stock" exact component={BankStock} />
      </Router>
      <Footer />
    </div>
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