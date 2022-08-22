import Link from 'next/link';
import React from 'react';
import { NavBar } from './header.styles';

const Header = () => {
  return (
    <NavBar>
      <Link href={"/"}>Faire mes courses</Link>
      <Link href={"/recipes/now"}>Voir mes recettes</Link>
    </NavBar>
  );
};

export default Header;