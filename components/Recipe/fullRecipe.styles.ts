import { MediaDesktop, MediaMobile } from 'components/responsive'
import styled from 'styled-components'

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
`

export const Image = styled.img`
  width: 250px;
  margin-bottom: 16px;
  ${MediaMobile} {
    width: 100%;
  }
`

export const Item = styled.p<{ blurred: boolean }>`
  margin: 2px 0;
  ${({ blurred }) => blurred && 'filter: blur(5px);'}
`

export const Title = styled.div<{ blurred: boolean }>`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
  ${({ blurred }) => blurred && 'filter: blur(5px);'}
`

export const TitleInfo = styled.div<{ blurred: boolean }>`
  color: #9b9b9b;
  ${({ blurred }) => blurred && 'filter: blur(5px);'}
`

export const Subtitle = styled.p<{ blurred: boolean }>`
  font-size: 20px;
  font-weight: bold;
  ${({ blurred }) => blurred && 'filter: blur(5px);'}
`

export const Description = styled.p<{ blurred: boolean }>`
  text-align: justify;
  ${({ blurred }) => blurred && 'filter: blur(5px);'}
`

export const PreviousButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 4px;
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  font-size: 16px;
  ${MediaMobile} {
    right: 32px;
  }
`
