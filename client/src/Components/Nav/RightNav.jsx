import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Ul = styled.ul`
  justify-content: flex-start;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  background-color: #8A7777;
  

  li {
    padding: 18px 0;
  }

  @media (max-width: 767px) {
    flex-flow: column nowrap;
    background-color: #57738C;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 60vh;
    width: 85px;
    padding-top: 1rem;
    border-radius: 3%;
    border-bottom-right-radius: 3%;
    border-top-right-radius: 0%;
    transition: transform 0.3s ease-in-out;
    z-index: 500 !important;
    

    li {
      
      color: #fff;
      
    }
    a:link {
      text-decoration: none;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <div className="navList-bubble">
      <Link to="/" ><li>Home</li></Link>
      </div>
      <Link to="/" ><li>News</li></Link>      
      <Link to="/userlogin-page"><li>Log In</li></Link>
      <Link to="/user"><li>Sign up</li></Link>
      <Link to="/userprofile"><li>User Profile</li></Link>  
      <Link to="/map"><li>VT Covid Map</li></Link> 
    </Ul>
  );
};

export default RightNav;
