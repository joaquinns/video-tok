import { Link } from 'wouter'
import { useAuth } from '../../context/AuthContext'
import styles from './navbar.module.css'
import Avatar from '../Avatar'
import UploadIcon from '../Icons/UploadIcon'

export default function Navbar() {
  const { handleGithubLogin, user } = useAuth()
  console.log(user?.user_metadata?.avatar_url)
  console.log(user)

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo_container}>
        <h1>App</h1>
      </div>

      <div className={styles.links_container}>
        {user && (
          <div className={styles.link}>
            <Link to='/upload'>
              <a>
                <UploadIcon />
              </a>
            </Link>
          </div>
        )}
        <div className={styles.button_login_container}>
          {user ? (
            <Avatar
              srcImage={user?.user_metadata?.avatar_url}
              width={36}
              height={36}
            />
          ) : (
            <button className={styles.button_login} onClick={handleGithubLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
