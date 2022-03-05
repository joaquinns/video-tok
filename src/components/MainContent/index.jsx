import styles from './mainContentContainer.module.css'

export default function MainContentContainer({ children }) {
  return <div className={styles.main_content}>{children}</div>
}
