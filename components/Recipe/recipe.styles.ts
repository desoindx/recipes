import Link from 'next/link'
import styled from 'styled-components'

export const ProductsList = styled.div<{
  withProducts: boolean
}>`
  display: flex;
  flex-direction: column;
  ${({ withProducts }) => !withProducts && 'display: none;'}
`

export const Description = styled.p<{ detailOnHover: boolean }>`
  color: #9b9b9b;
  margin: 0 auto;
  padding: 4px 0 16px 0;
  ${({ detailOnHover }) => detailOnHover && 'display: none;'}
`

export const BoxLink = styled(Link)`
  text-decoration: none;
`

export const Box = styled.div<{ empty?: boolean; detailOnHover?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc((100vw - 225px) / 4);
  padding-bottom: 16px;
  min-width: 300px;
  background-color: white;
  color: black;
  ${({ empty }) =>
    !empty &&
    `
    cursor: pointer;
    &:hover {
      background-color: #dddddd;
    }
  `}
  ${({ detailOnHover }) =>
    detailOnHover &&
    `&:hover {
    ${ProductsList} {
      display: flex;
    }
    ${Description} {
      display: block;
    }
  }`}
`
export const Title = styled.p<{ blurred?: boolean }>`
  font-size: 18px;
  text-align: justify;
  margin: 0 auto;
  padding: 16px 16px 0 16px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  ${({ blurred }) => blurred && 'filter: blur(5px);'}
`

export const Item = styled.span`
  margin: 2px 8px;
  &:last-child {
    margin-bottom: 0;
  }
`

export const Nutriscore = styled.img`
  position: absolute;
  top: 4px;
  left: 4px;
`
