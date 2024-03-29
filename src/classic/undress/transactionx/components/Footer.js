import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter='ALL'>
      All
    </FilterLink>
    {', '}
    <FilterLink filter='ACTIVE'>
      Active
    </FilterLink>
    {', '}
    <FilterLink filter='COMPLETED'>
      Completed
    </FilterLink>
  </p>
)

export default Footer
