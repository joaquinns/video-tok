import { useEffect, useState } from 'react'
import styles from './profile.module.css'
import PostVideo from '../../components/PostVideo'
import { getUserVideos } from '../../services/index'
import PostVideoSkeleton from '../../components/PostVideoSkeleton'

export default function Profile({ userId }) {
  const [loading, setLoading] = useState(false)
  const [profilePosts, setProfilePosts] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchProfileVideos = async () => {
      setLoading(true)
      const [error, videos] = await getUserVideos(userId, signal)
      if (error && error.code === 20) {
        return console.log('aborted')
      } else {
        console.log(error)
      }
      setProfilePosts(videos)
      setLoading(false)
    }
    fetchProfileVideos()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className={styles.profile_container}>
      <h1>Profile</h1>

      {loading ? (
        <PostVideoSkeleton />
      ) : (
        profilePosts.map((postVideo) => (
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
