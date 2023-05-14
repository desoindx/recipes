import React from 'react'
import { facetOptions } from 'components/Filter/facets'
import { Filters } from './filter.styles'

const Filter = ({ values, setValues }) => (
  <Filters>
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
  </Filters>
)

export default Filter
