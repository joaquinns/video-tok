import styles from './postvideo.module.css'
import LikeIcon from '../Icons/LikeIcon'
import clsx from 'clsx'
import usePlayer from '../../hooks/usePlayer'
import PropTypes from 'prop-types'
import Avatar from '../Avatar'

export default function PostVideo() {
  const { handlePlay, playing, videoRef } = usePlayer()

  const playerClassname = clsx(styles.player, {
    [styles.hidden]: playing
  })

  return (
    <div className={styles.video_post}>
      <div className={styles.video_post_header}>
        <Avatar />

        <div className={styles.video_post_username}>
          <h3>Username</h3>
          <h4>name</h4>
        </div>
      </div>

      <p className={styles.video_post_description}>A simple description</p>
      <div className={styles.video_wrapper}>
        <div className={styles.video}>
          <div className={styles.video_player_container}>
            <video
              src='https://v16-webapp.tiktok.com/3f8e3800117ad1d222d1b7f61dd617ce/622429f5/video/tos/useast2a/tos-useast2a-pve-0068/4494a842ed3245ba81e84502b01599bf/?a=1988&br=2130&bt=1065&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=XOQ9-3LPnz7Th63gCDXq&l=2022030521251201022308213817BB694C&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anRxOTo6ZnNvOzMzNzczM0ApPDhnNjM8ODxnNzw4aDk4OmdoYmFicjRfci1gLS1kMTZzczFhMWBjLy4yX2NhYmA0MDE6Yw%3D%3D&vl=&vr='
              ref={videoRef}
              controls={false}
              onClick={handlePlay}
              loop
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
