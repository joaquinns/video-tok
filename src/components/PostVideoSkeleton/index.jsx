import ContentLoader from 'react-content-loader'
import styles from './postVideoSkeleton.module.css'

export default function PostVideoSkeleton(props) {
  return (
    <div className={styles.content_skeleton}>
      <ContentLoader
        speed={2}
        width={400}
        height={600}
        viewBox='0 0 400 600'
        style={{ width: '100%' }}
        backgroundColor='#f3f3f3'
        foregroundColor='#ededed'
        {...props}
      >
        <circle cx='29' cy='28' r='27' />
        <rect x='67' y='11' rx='2' ry='2' width='160' height='14' />
        <rect x='68' y='36' rx='2' ry='2' width='160' height='14' />
        <rect x='0' y='60' rx='2' ry='2' width='370' height='520' />
      </ContentLoader>
    </div>
  )
}
