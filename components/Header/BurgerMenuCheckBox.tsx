'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './BurgerMenu.module.css'

const BurgerMenuCheckBox = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  return (
    <>
      <input
        id="menu-toggle"
        className={styles.menuToggle}
        type="checkbox"
        checked={open}
        onChange={(e) => {
          setOpen(e.target.checked)
        }}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="menu-principal"
      />
      <label
        ref={ref}
        className={styles.menuButtonContainer}
        htmlFor="menu-toggle"
      >
        <div className={styles.menuButton}></div>
      </label>
    </>
  )
}

export default BurgerMenuCheckBox
