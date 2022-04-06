import { useEffect, useState } from 'react'
import styles from './notification.module.css'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export default function Notification({ text, autoClose = true }) {
  const [close, setClose] = useState(false)

  const notificationClass = clsx(styles.notification, {
    [styles.slideOut]: close,
    [styles.slideIn]: !close
  })

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setClose(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [autoClose])

  return <div className={notificationClass}>{text}</div>
}

Notification.propTypes = {
  text: PropTypes.string
}
