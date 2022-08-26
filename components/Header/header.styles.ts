import { MediaDesktop, MediaMobile } from "components/responsive";
import styled from "styled-components";

export const NavBar = styled.nav`
  border-bottom: 1px solid white;
  padding: 16px 32px;
  a {
    color: white;
    text-decoration: none;
    margin: 32px;
    padding: 16px;
    &:hover {
      color: #c8c8c8;
    }
  }
`;

export const Container = styled.div`
  ${MediaMobile} {
    display: none;
  }
`;

export const BurgerContainer = styled.div`
  height: fit-content;
  ${MediaDesktop} {
    display: none;
  }
`;
