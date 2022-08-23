import styled from "styled-components";
import ReactSelect from "react-select";


export const Container = styled.div`
  overflow: auto;
  max-height: 100%;
`;

export const Header = styled.div`
  margin: 32px;
  display: flex;
  gap: 64px;
  align-items: center;
`;

export const Select = styled(ReactSelect)`
  width: 460px;
`

export const AllRecipes = styled.div`
  padding: 0 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 32px;
`;
