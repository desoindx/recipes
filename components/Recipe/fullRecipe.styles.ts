import Button from "components/Button";
import { MediaDesktop, MediaMobile } from "components/responsive";
import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - 64px);
  padding: 32px;
  background-color: white;
  color: black;
  position: relative;
  display: flex;
  gap: 32px;
  ${MediaDesktop} {
    max-width: 900px;
    margin: 48px auto;
  }
  ${MediaMobile} {
    flex-direction: column;
    margin-bottom: 100px;
  }
`;

export const Image = styled.img`
  width: 250px;
  margin-bottom: 16px;
  ${MediaMobile} {
    width: 100%;
  }
`;

export const Item = styled.p`
  margin: 2px 0;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const TitleInfo = styled.div`
  color: #9b9b9b;
`

export const Subtitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const Description = styled.p`
  text-align: justify;
`;

export const PreviousButton = styled(Button)`
  position: absolute;
  bottom: -64px;
  right: 0;
  ${MediaMobile} {
    right: 32px;
  }
`;
