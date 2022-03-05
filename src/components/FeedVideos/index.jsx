import { useRef, useState } from 'react'
import LikeIcon from '../Icons/LikeIcon'
import styles from './feedVideos.module.css'
import clsx from 'clsx'

export default function FeedVideos() {
  const [playing, setPlaying] = useState(false)
  const video = useRef(null)
  const handlePlay = () => {
    playing ? video.current.pause() : video.current.play()
    setPlaying(!playing)
  }

  const playerClassname = clsx(styles.player, {
    [styles.hidden]: playing
  })

  return (
    <div className={styles.feed_container}>
      <div className={styles.video_post}>
        <div className={styles.video_post_header}>
          <div className={styles.avatar_container}>
            <span>avatar</span>
          </div>

          <div className={styles.video_post_username}>
            <h3>Username</h3>
            <h4>name</h4>
          </div>
        </div>

        <p className={styles.video_post_description}>A simple description</p>
      </div>

      <div className={styles.video_wrapper}>
        <div className={styles.video}>
          <div className={styles.video_player_container}>
            <video
              src='https://v16-webapp.tiktok.com/835bcbae8a2e3ba9e91b7e1a8a387ef0/6221aaa2/video/tos/useast2a/tos-useast2a-ve-0068c003/d2076832c7f448728df32d6ffb7b4ba2/?a=1988&amp;br=3926&amp;bt=1963&amp;cd=0%7C0%7C1%7C0&amp;ch=0&amp;cr=0&amp;cs=0&amp;cv=1&amp;dr=0&amp;ds=3&amp;er=&amp;ft=XOQ9-3LPnz7ThlykCDXq&amp;l=2022030323575201022308414111670EE3&amp;lr=tiktok_m&amp;mime_type=video_mp4&amp;net=0&amp;pl=0&amp;qs=0&amp;rc=M3VkNWc6ZjRoOzMzNzczM0ApO2g2OGZmZGU6NzMzMzM2M2cyXjRucjQwMTRgLS1kMTZzc18vYDAwMWM2Xy5iMGBfMS46Yw%3D%3D&amp;vl=&amp;vr='
              className='tiktok-lkdalv-VideoBasic e1yey0rl4'
              ref={video}
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
