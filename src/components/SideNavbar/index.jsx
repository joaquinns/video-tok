import styles from './sidenavbar.module.css'
import { HomeIcon } from '../Icons/HomeIcon'
import { VideoIcon } from '../Icons/VideoIcon'

// recordar hacer iconos

export default function SideNavbar() {
  return (
    <div>
      <div className={styles.sidenavbar_container}>
        <div className={styles.scroll_styled}>
          <div className={styles.wrapper}>
            <div className={styles.main_nav_actions}>
              <a className={styles.nav_link}>
                <HomeIcon />
                <h2>Home</h2>
              </a>
              <a className={styles.nav_link}>
                <VideoIcon />
                <h2>Video</h2>
              </a>
            </div>
            <div>Avatar</div>
          </div>
        </div>
      </div>
    </div>
  )
}
