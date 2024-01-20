'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getLocalStorageItem } from 'services/dates'
import styles from './button.module.css'

const WeekButtons = ({ startDate }: { startDate: string }) => {
  const [nextPath, setNextPath] = useState<string>('')
  const [previousPath, setPreviousPath] = useState<string>('')

  useEffect(() => {
    const now = new Date(startDate)
    for (let i = 0; i < 200; i++) {
      now.setDate(now.getDate() + 7)
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setNextPath(now.toISOString())
        return
      }
    }
    setNextPath('')
  }, [startDate])

  useEffect(() => {
    const now = new Date(startDate)
    for (let i = 0; i < 200; i++) {
      now.setDate(now.getDate() - 7)
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setPreviousPath(now.toISOString())
        return
      }
    }
    setPreviousPath('')
  }, [startDate])

  return nextPath || previousPath ? (
    <div className={styles.buttons}>
      {previousPath && (
        <Link className={styles.linkButton} href={`/recipes/${previousPath}`}>
          Voir la semaine précendante
        </Link>
      )}
      {nextPath && (
        <Link className={styles.linkButton} href={`/recipes/${nextPath}`}>
          Voir la semaine suivante
        </Link>
      )}
    </div>
  ) : null
}

export default WeekButtons
