import styled from "styled-components";

export const Title = styled.span`
  text-align: center;
`;

export const Container = styled.div`
  overflow: scroll;
  min-width: fit-content;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px;
  border-right: solid 1px white;
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: white;
  color: black;
  padding: 16px;
  &:hover {
    background-color: #999999;
  }
`;

export const Items = styled.div`
  margin-bottom: 8px;
  width: calc((100vw - 280px) / 4);
  display: flex;
  flex-direction: column;
`

export const Item = styled.span`
  color: white;
`;
