import PropTypes from 'prop-types'
import styles from './avatar.module.css'

export default function Avatar({ srcImage, width = 60, height = 60 }) {
  return (
    <div className={styles.avatar_container}>
      <img
        className={styles.avatar}
        loading='lazy'
        src={srcImage}
        alt='avatar image'
        width={width}
        height={height}
      />
    </div>
  )
}

Avatar.propTypes = {
  srcImage: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}
