import { useRef } from 'react'
import styles from './postvideo.module.css'
import LikeIcon from '../Icons/LikeIcon'
import clsx from 'clsx'
import usePlayer from '../../hooks/usePlayer'
import PropTypes from 'prop-types'
import Avatar from '../Avatar'
import DeleteIcon from '../Icons/DeleteIcon'
import { useAuth } from '../../context/AuthContext'
import { useLikesCount } from '../../hooks/useLikesCount'
import { deleteVideo } from '../../services/'

export default function PostVideo({
  description,
  srcVideo,
  avatarURL,
  username,
  postId,
  likes,
  userPost
}) {
  const { user } = useAuth()
  const userId = user.id
  const video = useRef(null)
  const { handlePlay, playing } = usePlayer(video)
  const { toggleLike, likesNumber, like } = useLikesCount({
    userId,
    postId,
    likes
  })

  const playerClassname = clsx(styles.player, {
    [styles.hidden]: playing
  })

  const likeClassname = clsx(styles.like_icon, {
    [styles.liked]: like
  })

  const handleDelete = (postId) => {
    deleteVideo(postId)
  }

  return (
    <div className={styles.video_post}>
      <div className={styles.video_post_header}>
        <Avatar srcImage={avatarURL} />

        <div className={styles.video_post_username}>
          <h3>{username}</h3>
        </div>

        {user && user.id === userPost && (
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(postId)}
          >
            <DeleteIcon />
          </button>
        )}
      </div>

      <p className={styles.video_post_description}>{description}</p>
      <div className={styles.video_wrapper}>
        <div className={styles.video}>
          <div className={styles.video_player_container}>
            <video
              src={srcVideo}
              // ref={videoRef}
              ref={video}
              controls={false}
              onClick={handlePlay}
              preload='auto'
              loop
            />
            <i className={playerClassname} onClick={handlePlay}></i>
          </div>
        </div>

        <div className={styles.video_actions_container}>
          <button className={styles.action_button} onClick={toggleLike}>
            <span className={likeClassname}>
              <LikeIcon />
            </span>
          </button>
          <strong className={styles.strong_text}>{likesNumber}</strong>
        </div>
      </div>
    </div>
  )
}

PostVideo.propTypes = {
  description: PropTypes.string,
  srcVideo: PropTypes.string,
  avatarURL: PropTypes.string,
  username: PropTypes.string,
  postId: PropTypes.number,
  likes: PropTypes.number,
  userPost: PropTypes.string
}
