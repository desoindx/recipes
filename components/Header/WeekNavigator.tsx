'use client'

import classNames from 'classnames'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getFrontDate, getLocalStorageItem } from 'services/dates'
import buttonStyles from '../Button/button.module.css'
import styles from './WeekNavigator.module.css'

const WeekNavigator = ({ startDate }: { startDate: string }) => {
  const [nextPath, setNextPath] = useState('')
  const [previousPath, setPreviousPath] = useState('')

  useEffect(() => {
    const now = new Date(startDate)
    for (let i = 0; i < 10000; i++) {
      now.setDate(now.getDate() + 1)
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setNextPath(now.toISOString().split('T')[0])
        return
      }
    }
    setNextPath('')
  }, [startDate])

  useEffect(() => {
    const now = new Date(startDate)
    for (let i = 0; i < 10000; i++) {
      now.setDate(now.getDate() - 1)
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setPreviousPath(now.toISOString().split('T')[0])
        return
      }
    }
    setPreviousPath('')
  }, [startDate])

  return (
    <div className={styles.container}>
      <div className={styles.navigator}>
        <h1>
          Recettes de la semaine du{' '}
          {startDate ? getFrontDate(startDate) : '...'}
        </h1>
        <div className={styles.buttons}>
          {previousPath && (
            <Link
              prefetch={false}
              className={classNames(styles.leftButton, buttonStyles.linkButton)}
              href={`/recipes/${previousPath}`}
            >
              Précédente
            </Link>
          )}
          {nextPath && (
            <Link
              prefetch={false}
              className={classNames(
                styles.rightButton,
                buttonStyles.linkButton,
              )}
              href={`/recipes/${nextPath}`}
            >
              Suivante
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeekNavigator
