import React from 'react'
import styled from 'styled-components';

import AuthButtonOptions from '../auth/authButtonOptions'


export default function Navbar() {
    return (
        <NavbarContainer>
            <div className="Navbar"> 
                <AuthButtonOptions />
            </div>
        </NavbarContainer>
    )
}

const NavbarContainer = styled.div`
.Navbar {
  height: 70px;
  display: flex;
  justify-content:flex-end;
  align-items: center;
  background-color: #e02525;
}

button,
input[type="submit"] {
  border: none;
  background: none;
  color: unset;
  cursor: pointer;
}

.Navbar .auth-options {
    height: 100%;
    display: flex;
  }

.Navbar .auth-options button {
    padding: 1rem;
    background-color: #b91b1b;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: bold;
  }
.Navbar .auth-options button:hover {
    background-color: #be3a3a;
  }

`;