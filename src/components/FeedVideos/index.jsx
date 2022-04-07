import PostVideo from '../PostVideo'
import Error from '../Error'
import PostVideoSkeleton from '../PostVideoSkeleton'
import styles from './feedVideos.module.css'
import { useGetVideos } from '../../hooks/useGetVideos'

export default function FeedVideos() {
  const { error, loading, postVideos } = useGetVideos({})

  if (error) {
    return (
      <div className={styles.feed_container}>
        <Error />
      </div>
    )
  }

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
            postId={postVideo.id}
            likes={
              (postVideo.likes?.length === null) |
              undefined |
              NaN |
              !postVideo.likes
                ? 0
                : postVideo.likes?.length
            }
            userPost={postVideo.user_id.id}
          />
        ))
      )}
    </div>
  )
}
