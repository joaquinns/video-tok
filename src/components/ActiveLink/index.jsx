import styles from './activelink.module.css'
import clsx from 'clsx'
import { useRoute, Link } from 'wouter'

export const ActiveLink = ({ children, href }) => {
  const [isActive] = useRoute(href)

  const active = clsx(styles.nav_link, {
    [styles.nav_link_active]: isActive
  })
  return (
    <Link href={href}>
      <a className={active}>{children}</a>
    </Link>
  )
}
