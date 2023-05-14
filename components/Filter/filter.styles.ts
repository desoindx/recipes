import styled from 'styled-components'

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;

  label {
    cursor: pointer;
    input {
      cursor: pointer;
      margin-right: 8px;
    }
  }
`
