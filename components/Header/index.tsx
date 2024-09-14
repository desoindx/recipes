import Link from 'next/link'
import React from 'react'
import BurgerMenu from './BurgerMenu'
import styles from './header.module.css'
import menu from './menu.config'

export const Header = () => (
  <nav className={styles.navbar}>
    <div className={styles.container}>
      {menu.map((item) => (
        <Link key={item.href} href={item.href} prefetch={false}>
          {item.label}
        </Link>
      ))}
    </div>
    <div className={styles.burgerContainer}>
      <BurgerMenu />
    </div>
  </nav>
)

export default Header
