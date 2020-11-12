import React from 'react';
import styled from 'styled-components';
import Burger from './Hamburger';

const Nav = styled.nav`
  width: 85vw;
  height: 55px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  
  .logo {
    padding: 15px 0;
  }
  @media (min-width: 768px) {
    display: none;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
       
      </div>
      <Burger />
    </Nav>
  )
}

export default Navbar