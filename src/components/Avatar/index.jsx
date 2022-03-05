import PropTypes from 'prop-types'
import styles from './avatar.module.css'

function Avatar({ width = 60, height = 60 }) {
  return (
    <div className={styles.avatar_container}>
      <img
        className={styles.avatar}
        loading='lazy'
        src='https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/12762135a3b5593013a8e94aabc4015f~c5_100x100.jpeg?x-expires=1646604000&x-signature=ZtQ%2Fb5IggYTohM2sYhG%2BUNjZEJo%3D'
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

export default Avatar
