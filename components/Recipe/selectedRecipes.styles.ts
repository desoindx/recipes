import styled from "styled-components";

export const Title = styled.span`
  text-align: center;
`;

export const Container = styled.div`
  overflow: auto;
  min-width: fit-content;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px;
  border-right: solid 1px white;
`;

export const Items = styled.div`
  margin-bottom: 8px;
  width: calc((100vw - 195px) / 4);
  display: flex;
  flex-direction: column;
`

export const Item = styled.span`
  color: white;
`;
