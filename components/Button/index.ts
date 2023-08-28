import Link from 'next/link'
import styled from 'styled-components'

export default styled.button`
  cursor: pointer;
  background-color: white;
  color: black;
  padding: 16px;
  &:hover {
    background-color: #c8c8c8;
  }
`

export const ButtonLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  background-color: white;
  color: black;
  padding: 16px;
  &:hover {
    background-color: #c8c8c8;
  }
`
