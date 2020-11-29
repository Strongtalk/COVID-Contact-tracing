import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import firebaseApp from "../auth/firebase.js";

const Ul = styled.ul`
  justify-content: flex-start;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  background-color: #8a7777;

  li {
    padding: 18px 0;
  }

  @media (max-width: 767px) {
    flex-flow: column nowrap;
    background-color: #57738c;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 60vh;
    width: 85px;
    padding-top: 1rem;
    border-radius: 24px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
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
  const [user, setCurrentUser] = useState(null);
  
//logout and redirect to home/ landing page
  const handleLogout = () => {
    firebaseApp.auth().signOut();
    <Redirect to="/" />;
  };

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  //let userEmail = "marco@gmail.com"

  return (
    <Ul open={open}>
      <div className="navList-bubble">
        <Link to="/">
          <li>News</li>
        </Link>
      </div>
      {!user ? (
        <Link to="/userlogin-page">
          <li>Log In</li>
        </Link>
      ) : null}
      {!user ? (
        <Link to="/user">
          <li>Sign up</li>
        </Link>
      ) : null}
      {user ? (
        <Link to="/userprofile">
          <li>My Events</li>
        </Link>
      ) : null}
      {user ? <li onClick={handleLogout}>Sign Out</li> : null}
      <Link to="/map">
        <li>VT Covid Map</li>
      </Link>
      {/* {userEmail === "emilysaber13@gmail.com" ?
      <Link to="/admin"><li>ADMIN THINGS</li></Link> : null } */}
    </Ul>
  );
};

export default RightNav;
