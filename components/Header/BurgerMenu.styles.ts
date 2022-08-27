import styled from "styled-components";

export interface IconProps {
  isBurgerMenuOpen: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0;
  }
`;

export const Button = styled.button`
  padding: 0;
`;

export const Icon = styled.div`
  cursor: pointer;
  position: relative;
  width: 54px;
  height: 54px;
  transition: transform 0.5s;
  transform: ${(props: IconProps) =>
    props.isBurgerMenuOpen ? "transform: rotate(180deg)" : "none"};
  background-color: black;
  &:before {
    content: "";
    position: absolute;
    top: 14px;
    left: 16px;
    display: ${(props: IconProps) =>
      props.isBurgerMenuOpen ? "none" : "block"};
    background: white;
    width: 22px;
    height: 2px;
    transform: ${(props: IconProps) =>
      props.isBurgerMenuOpen
        ? "translateY(0) rotate(45deg)"
        : "translateY(6px)"};
  }
`;

export const Line = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 22px;
  height: 2px;
  background-color: ${(props: IconProps) =>
    props.isBurgerMenuOpen ? "transparent" : "white"};
  transition: background 0.5s;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 22px;
    height: 2px;
    background-color: white;
    transition: transform 0.5s;
  }
  &:before {
    transform: ${(props: IconProps) =>
      props.isBurgerMenuOpen
        ? "translateY(0) rotate(45deg)"
        : "translateY(6px)"};
  }
  &:after {
    transform: ${(props: IconProps) =>
      props.isBurgerMenuOpen
        ? "translateY(0) rotate(-45deg)"
        : "translateY(6px)"};
  }
`;

export const SidePanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  border-right: 1px solid white;
  background-color: black;
  z-index: 3;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
