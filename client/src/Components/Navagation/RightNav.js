import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;

li {
    padding: 18px 10px;
}
@media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #2A5932;
    position: fixed;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%'};
    top: 0;
    right: 0;
    height: 65vh;
    width: 300px;
    padding-top: 3rem;
    transition: transform 0.3s ease-in-out;
    
    li {
        color: #fff;
    }
}
`;

const RightSide = ({ open }) => {
    return (
        <Ul open={open}>
                <li>Home</li>
                <li>Log In</li>
                <li>Sign Up</li>
                <li>Add Event</li>
                <li>News</li>
                <li>Contact</li>
            </Ul>
            
    )
}
export default RightSide;