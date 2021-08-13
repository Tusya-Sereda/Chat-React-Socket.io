import styled from 'styled-components';

export const StyledMenu = styled.nav `
  bordet: 1px solid black;
  height: 25%;
  width: 25%;
  position: fixed;
  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 5rem 0;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const StyledLink = styled.a `
  padding: 0 2rem;
  color: black;
  text-decoration: none;

  :hover {
    color: purple;
  }
`;