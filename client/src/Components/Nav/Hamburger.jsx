// imports for the component
import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from './RightNav';

//This is styled components at its finest... just doing inner CSS,,,
// below line 23 is where all the animation magic comes in 
const AnimatedBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 4px;
  right: 5px;
  z-index: 20;
  display: none;
  @media (max-width: 767px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  };

  
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#000000' : '#57738C'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

// making component here with => function and useState to trigger the opening on the nav bar
const Burger = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <AnimatedBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </AnimatedBurger>
      {/** calling the right side nav bar component */}
      <RightNav open={open}/>
    </>
  )
}
export default Burger;
