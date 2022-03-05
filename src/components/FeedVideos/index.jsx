import PostVideo from '../PostVideo'
import styles from './feedVideos.module.css'

export default function FeedVideos() {
  return (
    <div className={styles.feed_container}>
      <PostVideo />
    </div>
  )
}
