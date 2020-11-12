import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
  justify-content: flex-start;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  background-color: #8A7777;
  

  li {
    padding: 18px 0;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #255c27;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 45vh;
    width: 150px;
    padding-top: 1rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
      text-decoration: none;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <a href="/" ><li>Home</li></a>
      <a href="/" ><li>News</li></a>      
      <a href="/userlogin-page"><li>Log In</li></a>
      <a href="/user"><li>Sign up</li></a>
      <a href="/event"><li>Add Event</li></a>
      <a href="/addinfo-page"><li>Track Activity</li></a>  
    </Ul>
  );
};

export default RightNav;
