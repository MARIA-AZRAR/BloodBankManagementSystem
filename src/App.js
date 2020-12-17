import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

//Blood Bank
import BankHome from './components/BloodBank/BankHome.component';
import BankNavbar from './components/BloodBank/BankNavbar.component';
import BankDonor from './components/BloodBank/BankDonor.component';
import BankReciever from './components/BloodBank/BankReciever.component';
import BankRequest from './components/BloodBank/BankRequest.component';
import BankStock from './components/BloodBank/BankStock.component';
import Sidebar from './components/Sidebar.component';

import Login from './components/login-form.component';
import LoginAdmin from './components/login-form-admin.component';
import SignupBloodBank from './components/signup-form-bloodBank.component'

import Navbar from './components/navbar.component';
import Header from './components/Header.component';
import Footer from './components/Footer.component';



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