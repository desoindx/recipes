import styled from 'styled-components'
import { MediaDesktop, MediaMobile } from 'components/responsive'

export const Container = styled.div`
  overflow: auto;
  max-height: 100%;
`

export const Header = styled.div`
  margin: 32px;
  display: flex;
  gap: 16px 128px;
  justify-content: center;
  align-items: center;
  ${MediaMobile} {
    flex-direction: column;
  }
`

export const AllRecipes = styled.div`
  padding: 0 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  ${MediaDesktop} {
    justify-content: space-evenly;
  }
`
