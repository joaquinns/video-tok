import styles from './postvideo.module.css'
import LikeIcon from '../Icons/LikeIcon'
import clsx from 'clsx'
import usePlayer from '../../hooks/usePlayer'
import PropTypes from 'prop-types'
import Avatar from '../Avatar'

export default function PostVideo({
  description,
  srcVideo,
  avatarURL,
  username
}) {
  const { handlePlay, playing, videoRef } = usePlayer()

  const playerClassname = clsx(styles.player, {
    [styles.hidden]: playing
  })

  return (
    <div className={styles.video_post}>
      <div className={styles.video_post_header}>
        <Avatar srcImage={avatarURL} />

        <div className={styles.video_post_username}>
          <h3>{username}</h3>
          <h4>name</h4>
        </div>
      </div>

      <p className={styles.video_post_description}>{description}</p>
      <div className={styles.video_wrapper}>
        <div className={styles.video}>
          <div className={styles.video_player_container}>
            <video
              src={srcVideo}
              ref={videoRef}
              controls={false}
              onClick={handlePlay}
              loop
              preload='none'
            ></video>
            <i className={playerClassname} onClick={handlePlay}></i>
          </div>
        </div>

        <div className={styles.video_actions_container}>
          <button className={styles.action_button}>
            <span className={styles.like_icon}>
              <LikeIcon />
            </span>
            <strong className={styles.strong_text}>123</strong>
          </button>
          <button className={styles.action_button}>1</button>
        </div>
      </div>
    </div>
  )
}

PostVideo.propTypes = {
  username: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  srcVideo: PropTypes.string,
  likes: PropTypes.number
}
