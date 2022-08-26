import React, { useEffect } from "react";
import { Container, Button, Icon, Line, SidePanel } from "./BurgerMenu.styles";
import { menu } from ".";
import Link from "next/link";

interface BurgerMenuProps {
  burgerMenuCollapse: (value: boolean) => void;
  isBurgerMenuOpen: boolean;
}

const BurgerMenu = ({
  isBurgerMenuOpen,
  burgerMenuCollapse,
}: BurgerMenuProps): JSX.Element => {
  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isBurgerMenuOpen]);

  return (
    <>
      <Container>
        <h1>Weekly recipes</h1>
        <Button
          type="button"
          onClick={() => burgerMenuCollapse(!isBurgerMenuOpen)}
          aria-label={isBurgerMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isBurgerMenuOpen ? "true" : "false"}
          aria-controls="menu-principal"
        >
          <Icon isBurgerMenuOpen={isBurgerMenuOpen}>
            <Line isBurgerMenuOpen={isBurgerMenuOpen} />
          </Icon>
        </Button>
      </Container>
      {isBurgerMenuOpen && (
        <SidePanel onClick={() => burgerMenuCollapse(false)}>
          {menu.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </SidePanel>
      )}
    </>
  );
};
export default BurgerMenu;
