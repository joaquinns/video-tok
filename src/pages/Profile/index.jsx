import { useEffect, useState } from 'react'
import styles from './profile.module.css'
import PostVideo from '../../components/PostVideo'
import { getUserVideos } from '../../services/index'

export default function Profile({ userId }) {
  const [profilePosts, setProfilePosts] = useState([])

  const fetchProfileVideos = async () => {
    const [error, videos] = await getUserVideos(userId)
    if (error) {
      throw console.error(error)
    }
    setProfilePosts(videos)
  }

  useEffect(() => {
    fetchProfileVideos()
  }, [])

  return (
    <div className={styles.profile_container}>
      <h1>Profile</h1>

      {profilePosts.length > 0 ? (
        profilePosts.map((postVideo) => (
          <PostVideo
            key={postVideo.id}
            srcVideo={postVideo.src}
            description={postVideo.description}
            avatarURL={postVideo.user_id.avatar_url}
            username={postVideo.user_id.username}
          />
        ))
      ) : (
        <h1>You dont have videos x.x</h1>
      )}
    </div>
  )
}
