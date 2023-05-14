import styled from 'styled-components'
import { MediaDesktop } from 'components/responsive'

export const Selects = styled.div`
  display: flex;
  padding: 32px;
  gap: 16px 32px;
  flex-direction: column;
  ${MediaDesktop} {
    flex-direction: row;
    > div {
      width: 50%;
    }
  }
`
