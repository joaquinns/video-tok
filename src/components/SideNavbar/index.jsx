import styles from './sidenavbar.module.css'
import { HomeIcon } from '../Icons/HomeIcon'
import { HomeIconActive } from '../Icons/HomeIconActive'
import { VideoIcon } from '../Icons/VideoIcon'
import { Link, useRoute } from 'wouter'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../Avatar'

export default function SideNavbar(props) {
  const { user } = useAuth()
  const [isActive] = useRoute(props.href)

  return (
    <div>
      <div className={styles.sidenavbar_container}>
        <div className={styles.scroll_styled}>
          <div className={styles.wrapper}>
            <div className={styles.main_nav_actions}>
              <Link to='/' {...props}>
                <a className={styles.nav_link}>
                  {isActive ? <HomeIconActive /> : <HomeIcon />}
                  <h2>Home</h2>
                </a>
              </Link>
              <a className={styles.nav_link}>
                <VideoIcon />
                <h2>Video</h2>
              </a>
              {user && (
                <Link to={`/profile/${user.id}`} {...props}>
                  <a className={styles.nav_link}>
                    <Avatar
                      srcImage={user.user_metadata.avatar_url}
                      width={40}
                      height={40}
                    />
                    <h2>{user.user_metadata.user_name}</h2>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
