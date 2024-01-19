import React from 'react'
import { facetOptions } from 'components/Filter/facets'
import styles from './filter.module.css'

const Filter = ({ values, setValues }) => (
  <div className={styles.filters}>
    {facetOptions.map((facet) => (
      <label key={facet.value}>
        <input
          name={facet.value}
          type="checkbox"
          checked={values.includes(facet.value)}
          onChange={setValues}
        />
        {facet.label}
      </label>
    ))}
  </div>
)

export default Filter
