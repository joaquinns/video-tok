import { useEffect, useState } from 'react'
import { getVideos } from '../../services'
import PostVideo from '../PostVideo'
import styles from './feedVideos.module.css'

export default function FeedVideos() {
  const [postVideos, setPostVideos] = useState([])
  const [error, setError] = useState(null)

  const fetchVideos = async () => {
    const [error, videos] = await getVideos()
    if (error) console.error(error)
    setError(error)
    setPostVideos(videos)
  }

  console.log(error)

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div className={styles.feed_container}>
      {postVideos.length > 0 ? (
        postVideos.map((postVideo) => (
          <PostVideo
            key={postVideo}
            srcVideo={postVideo.src}
            description={postVideo.description}
            avatarURL={postVideo.user_id.avatar_url}
            username={postVideo.user_id.username}
          />
        ))
      ) : (
        <h1>No videos to show x.x</h1>
      )}
    </div>
  )
}
