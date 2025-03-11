import Link from 'next/link'
import styles from './BurgerMenu.module.css'
import BurgerMenuCheckBox from './BurgerMenuCheckBox'
import menu from './menu.config'

const BurgerMenu = () => (
  <>
    <div className={styles.container}>
      <span>Weekly recipes</span>
      <BurgerMenuCheckBox />
      <ul className={styles.menu}>
        {menu.map((item) => (
          <li key={item.href}>
            <Link href={item.href} prefetch={false}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
)
export default BurgerMenu
