import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
  justify-content: flex-end;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #255c27;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 55vh;
    width: 150px;
    padding-top: 1rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
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
