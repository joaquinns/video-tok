import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '../../context/AuthContext'
import styles from './navbar.module.css'
import Avatar from '../Avatar'
import UploadIcon from '../Icons/UploadIcon'
import { Logout } from '../../services'

export default function Navbar() {
  const [, setLocation] = useLocation()
  const [toggle, setToggle] = useState(false)
  const { handleGithubLogin, user } = useAuth()
  console.log(user?.user_metadata?.avatar_url)
  console.log(user)

  const handleLogout = () => {
    Logout()
    setLocation('/')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo_container}>
        <h1>Social-Video</h1>
      </div>

      <div className={styles.links_container}>
        {user && (
          <Link to='/upload'>
            <a className={styles.link}>
              <UploadIcon />
            </a>
          </Link>
        )}
        <div className={styles.button_login_container}>
          {user ? (
            <>
              <button
                className={styles.button_logout}
                onClick={() => setToggle(!toggle)}
              >
                <Avatar
                  srcImage={user?.user_metadata?.avatar_url}
                  width={36}
                  height={36}
                />
              </button>
              {toggle && (
                <div className={styles.logout}>
                  <button onClick={handleLogout}>logout</button>
                </div>
              )}
            </>
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
