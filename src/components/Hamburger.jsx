import React from "react";
import { StyledHamburger } from "./Hamburger.styled";

export const Hamburger = ({ open, setOpen }) => {
  return (
    <StyledHamburger open={open} onClick={() => setOpen(!open)}>
      <div className="stripe first"> </div>
      <div className="stripe second"></div>
      <div className="stripe third"> </div>
    </StyledHamburger>
  );
};
