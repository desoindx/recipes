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
    <h1>
      Recettes de la semaine du {startDate ? getFrontDate(startDate) : '...'}
    </h1>
    {withFilter && filter && <Filter values={filter} setValues={setFilter} />}
  </div>
)

export default RecipesHeader
