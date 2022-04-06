import styles from './profile.module.css'
import PostVideo from '../../components/PostVideo'
import PostVideoSkeleton from '../../components/PostVideoSkeleton'
import Error from '../../components/Error'
import { useGetVideos } from '../../hooks/useGetVideos'

export default function Profile({ userId }) {
  const { error, loading, postVideos } = useGetVideos({ userId })

  return (
    <div className={styles.profile_container}>
      {error && <Error />}
      <h1>Profile</h1>

      {loading ? (
        <PostVideoSkeleton />
      ) : (
        !error &&
        postVideos.map((postVideo) => (
          <PostVideo
            key={postVideo.id}
            srcVideo={postVideo.src}
            description={postVideo.description}
            avatarURL={postVideo.user_id.avatar_url}
            username={postVideo.user_id.username}
            postId={postVideo.id}
            likes={postVideo.likes.length}
            userPost={postVideo.user_id.id}
          />
        ))
      )}
    </div>
  )
}
