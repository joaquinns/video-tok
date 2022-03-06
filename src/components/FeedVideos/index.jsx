import { useEffect } from 'react'
import { getVideos } from '../../services'
import PostVideo from '../PostVideo'
import styles from './feedVideos.module.css'

export default function FeedVideos() {
  useEffect(() => {
    getVideos().then(([error, videos]) => {
      console.log({ error, videos })
    })
  }, [])

  return (
    <div className={styles.feed_container}>
      <PostVideo />
    </div>
  )
}
