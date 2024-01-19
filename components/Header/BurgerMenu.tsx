
'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './BurgerMenu.module.css'
import menu from './menu.config'


const BurgerMenu = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [isOpen])

  return (
    <>
      <div className={styles.container}>
        <h1>Weekly recipes</h1>
        <button className={styles.button}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls="menu-principal"
        >
          <div className={classNames(styles.icon, { [styles.iconOpen]: isOpen })}>
            <div className={classNames(styles.line, { [styles.lineOpen]: isOpen })} />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className={styles.sidePanel} onClick={() => setIsOpen(false)}>
          {menu.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
export default BurgerMenu
