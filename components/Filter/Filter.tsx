import React, { Dispatch, SetStateAction } from 'react'
import { facetOptions } from 'components/Filter/facets'
import styles from './filter.module.css'

const Filter = ({
  values,
  setValues,
}: {
  values: string[]
  setValues?: Dispatch<SetStateAction<string[]>>
}) => (
  <div className={styles.filters}>
    {facetOptions.map((facet) => (
      <label key={facet.value}>
        <input
          name={facet.value}
          type="checkbox"
          checked={values.includes(facet.value)}
          readOnly={!setValues}
          onChange={
            setValues
              ? (e) => {
                  if (setValues) {
                    if (e.target.checked) {
                      setValues([...values, e.target.name])
                    } else {
                      const newFilter = values.filter(
                        (value) => value !== e.target.name,
                      )
                      setValues(
                        newFilter.length > 0
                          ? newFilter
                          : facetOptions.map((option) => option.value),
                      )
                    }
                  }
                }
              : undefined
          }
        />
        {facet.label}
      </label>
    ))}
  </div>
)

export default Filter
