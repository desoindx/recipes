'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import styles from './button.module.css'

const BackButton = () => {
  const router = useRouter()
  return (
    <button
      className={styles.backButton}
      onClick={() => {
        router.back()
      }}
    >
      Retour
    </button>
  )
}

export default BackButton
