import Link from 'next/link';
import React, { useState } from 'react';
import BurgerMenu from './BurgerMenu';
import { BurgerContainer, Container, NavBar } from './header.styles';

export const menu = [
  { href: '/', label: 'Faire mes courses' },
  { href: '/recipes/now', label: 'Voir mes recettes' },
  { href: '/restes', label: 'Utiliser mes restes' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
  );
};

export default Header;
