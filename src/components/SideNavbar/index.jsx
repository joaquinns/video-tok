import styles from './sidenavbar.module.css'
import { HomeIcon } from '../Icons/HomeIcon'
import { Profile } from '../Icons/ProfileIcon'
import { useAuth } from '../../context/AuthContext'
import { ActiveLink } from '../ActiveLink'

export default function SideNavbar() {
  const { user } = useAuth()

  return (
    <div>
      <div className={styles.sidenavbar_container}>
        <div className={styles.scroll_styled}>
          <div className={styles.wrapper}>
            <div className={styles.main_nav_actions}>
              <ActiveLink href='/'>
                <HomeIcon />
                <h2>Home</h2>
              </ActiveLink>
              {user && (
                <ActiveLink href={`/profile/${user.id}`}>
                  <Profile />
                  <h2>Profile</h2>
                </ActiveLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
