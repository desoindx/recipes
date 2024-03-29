import classNames from 'classnames'
import React from 'react'
import styles from './Nutriscore.module.css'

const Nutriscore = ({
  nutriscore,
  className,
}: {
  nutriscore: string
  className: string
}) => (
  <div
    className={classNames(className, styles[nutriscore])}
    title={`Nutriscore : ${nutriscore}`}
  >
    {nutriscore}
  </div>
)

export default Nutriscore
