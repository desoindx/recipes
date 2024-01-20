import React, { Dispatch, SetStateAction } from 'react'
import { getFrontDate } from 'services/dates'
import Filter from 'components/Filter/Filter'
import styles from './RecipesHeader.module.css'

const RecipesHeader = ({
  startDate,
  filter,
  setFilter,
  withFilter,
}: {
  startDate?: string
  filter?: string[]
  setFilter?: Dispatch<SetStateAction<string[]>>
  withFilter?: boolean
}) => (
  <div className={styles.header}>
    <span>
      Recettes de la semaine du {startDate ? getFrontDate(startDate) : '...'}
    </span>
    {withFilter && filter && <Filter values={filter} setValues={setFilter} />}
  </div>
)

export default RecipesHeader
