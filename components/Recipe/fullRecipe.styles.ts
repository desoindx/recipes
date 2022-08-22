import Button from "components/Button";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 64px auto;
  padding: 32px;
  background-color: white;
  color: black;
  position: relative;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

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
`;
