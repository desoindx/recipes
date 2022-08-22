import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: calc((100vw - 280px) / 4);
  background-color: white;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #999999;
  }
`
export const Title = styled.p`
  font-size: 18px;
  text-align: justify;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`

export const Item = styled.span`
  padding: 0 8px;
  &:last-child {
    margin-bottom: 16px;
  }
`

