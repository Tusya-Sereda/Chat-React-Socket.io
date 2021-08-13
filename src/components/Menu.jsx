import React, { useState, useRef } from "react";
import { Hamburger } from "./Hamburger";
import { StyledMenu, StyledLink } from "./Menu.styled";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

export const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const node = useRef(null);

  const close = () => setOpenMenu(false);

  // useOnClickOutside(node, () => setOpenMenu(false));

  return (
    <div className="menu-bar" ref={node}>
      <StyledMenu open={openMenu}>
        <StyledLink onClick={() => close()}>Link 1</StyledLink>
        <StyledLink onClick={() => close()}>Link 2</StyledLink>
        <StyledLink onClick={() => close()}>Link 3</StyledLink>
      </StyledMenu>
      <Hamburger open={openMenu} setOpen={setOpenMenu} />
    </div>
  );
};
