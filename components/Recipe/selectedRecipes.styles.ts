import { MediaDesktop, MediaMobile } from "components/responsive";
import styled from "styled-components";

export const Title = styled.span`
  text-align: center;
`;

export const Container = styled.div<{ hide: boolean }>`
  z-index: 2;
  background-color: black;
  overflow: auto;
  position: relative;
  min-width: fit-content;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px;
  border-right: solid 1px white;
  ${MediaMobile} {
    ${({ hide }) => hide && "display: none;"}
  }
`;

export const Items = styled.div`
  margin-bottom: 8px;
  width: calc((100vw - 195px) / 4);
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.span`
  color: white;
`;

export const HideButton = styled.button<{ hide: boolean }>`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: ${({ hide }) => (hide ? "-25px" : "340px")};
  padding-left: 25px;
  height: 50px;
  width: 50px;
  border-radius: 8px;
  background-color: white;
  ${MediaDesktop} {
    display: none;
  }
`;
