import { Link } from 'wouter'
import styles from './navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo_container}>
        <h1>App</h1>
      </div>

      <div className={styles.links_container}>
        <div className={styles.link}>
          <Link to='/home'>
            <a>Link</a>
          </Link>
        </div>
        <div className={styles.button_login_container}>
          <button className={styles.button_login}>Login</button>
        </div>
      </div>
    </nav>
  )
}
