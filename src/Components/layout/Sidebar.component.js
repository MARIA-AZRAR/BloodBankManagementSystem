import React, { useState , useContext} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { NavbarDataB } from './SidebarDataBloodBank';
import { NavbarDataR } from './SidebarDataRecipient';
import { NavbarDataD } from './SidebarDataDonor';
import { NavbarDataA } from './SidebarDataAdmin';

import UserContext from "../../context/userDetailContext";

//import './Sidebar.css';
import { IconContext } from 'react-icons';

function Sidebar() {
  const { userLoginData } = useContext(UserContext);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  
    //Determine the sidebar data 
    let data;
    if(userLoginData.userData){  //if there is any data
        if(userLoginData.userData.type === "Recipient") data = NavbarDataR;
        if(userLoginData.userData.type === "Donor") data = NavbarDataD;
        if(userLoginData.userData.type === "BloodBank") data = NavbarDataB;
        if(userLoginData.userData.type === "Admin") data = NavbarDataA;
    }

  return ( 
    <SidebarContainer>
      <>
        <IconContext.Provider value={{ color: ':#ce1d26' }}>
          <div className='sidebar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {data.map((item, index) => {
                return (
                  <>
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </nav> 
        </IconContext.Provider>
      </>
    </SidebarContainer>
  );
}

export default Sidebar;

//#ce1d26; nav color
const SidebarContainer = styled.div`


.menu-bars {
  margin-right: 1rem;
  margin-left: 1rem;
  font-size: 2rem;
  background: none;
  color: #ffffff;
  float: left;
}

.nav-menu {
  background-color: #e02525;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: left;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 850ms;
}

.nav-menu.active {
  left: 0;
  transition: 350ms;
}

.nav-text {
  display: flex;
  justify-content: start;
  align-items: center;
  list-style: none;
  height: 60px;
}

.nav-text a {
  text-decoration: none;
  color: #f5f5f5; 
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;
  font-weight: bold;
}

.nav-text a:hover {
  background-color: #b91b1b;
}

.nav-menu-items {
  width: 100%;
}

.navbar-toggle {
  background-color: #e02525;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
}

span {
  margin-left: 16px;
}
`;