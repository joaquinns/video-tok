import styles from './profile.module.css'
import PostVideo from '../../components/PostVideo'
import PostVideoSkeleton from '../../components/PostVideoSkeleton'
import Error from '../../components/Error'
import { useGetVideos } from '../../hooks/useGetVideos'
import { useLocation } from 'wouter'

export default function Profile({ userId }) {
  const [, setLocation] = useLocation()
  const { error, loading, postVideos } = useGetVideos({ userId })

  const handleCreate = () => {
    setLocation('/upload')
  }

  if (error) {
    return (
      <div className={styles.profile_container}>
        <h1>Profile</h1>
        <Error />
      </div>
    )
  }

  return (
    <div className={styles.profile_container}>
      <h1>Profile</h1>

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
            postId={postVideo.id}
            likes={!postVideo.likes ? 0 : postVideo.likes?.length}
            userPost={postVideo.user_id.id}
          />
        ))
      )}

      {postVideos.length < 1 && (
        <>
          <h1>You don&apos;t have any post!</h1>
          <button
            className={styles.button_redirect_create}
            onClick={handleCreate}
          >
            go!
          </button>
        </>
      )}
    </div>
  )
}
