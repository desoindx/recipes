import Link from 'next/link'
import React, { useState } from 'react'
import BurgerMenu from './BurgerMenu'
import { BurgerContainer, Container, NavBar } from './header.styles'
import menu from './menu.config'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NavBar>
      <Container>
        {menu.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </Container>
      <BurgerContainer>
        <BurgerMenu isBurgerMenuOpen={isOpen} burgerMenuCollapse={setIsOpen} />
      </BurgerContainer>
    </NavBar>
  )
}

export default Header
