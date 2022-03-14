import { useEffect, useState } from 'react'
import { getVideos } from '../../services'
import PostVideo from '../PostVideo'
import PostVideoSkeleton from '../PostVideoSkeleton'
import styles from './feedVideos.module.css'

export default function FeedVideos() {
  const [loading, setLoading] = useState(false)
  const [postVideos, setPostVideos] = useState([])
  // const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchVideos = async () => {
      setLoading(true)
      const [error, videos] = await getVideos(signal)
      if (error && error.code === 20) {
        return console.log('aborted')
      } else {
        console.log(error)
      }
      setPostVideos(videos)
      setLoading(false)
    }
    fetchVideos()

    return function cleanup() {
      controller.abort()
    }
  }, [])

  return (
    <div className={styles.feed_container}>
      {loading ? (
        <PostVideoSkeleton />
      ) : (
        postVideos.map((postVideo) => (
          <PostVideo
            key={postVideo.id}
            srcVideo={postVideo.src}
            description={postVideo.description}
            avatarURL={postVideo.user_id.avatar_url}
            username={postVideo.user_id.username}
          />
        ))
      )}
    </div>
  )
}
