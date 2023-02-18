import styled from 'styled-components';
import ReactSelect from 'react-select';
import { MediaDesktop, MediaMobile } from 'components/responsive';

export const Container = styled.div`
  overflow: auto;
  max-height: 100%;
`;

export const Header = styled.div`
  margin: 32px;
  display: flex;
  gap: 16px 64px;
  align-items: center;
  ${MediaMobile} {
    flex-direction: column;
  }
`;

export const Select = styled(ReactSelect)`
  width: 460px;
  ${MediaMobile} {
    width: 100%;
  }
`;

export const AllRecipes = styled.div`
  padding: 0 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  ${MediaDesktop} {
    justify-content: space-evenly;
  }
`;
