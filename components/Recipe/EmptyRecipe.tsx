import React from 'react'
import classNames from 'classnames'
import styles from './recipe.module.css'

const EmptyRecipe = () => (
  <div className={styles.box}>
    <img src="/loading.jpg" alt="Chargement..." />
    <p className={classNames(styles.title, 'blurred')}>Titre de recette en cours</p>
  </div>
)

export default EmptyRecipe
