import { useState } from 'react'
import clsx from 'clsx'
import UploadIconB from '../../components/Icons/UploadIconB'
import styles from './upload.module.css'
import { publishVideo } from '../../services'
import { useAuth } from '../../context/AuthContext'
import { useDragnDrop } from '../../hooks/useDragnDrop'
import Notification from '../../components/Notification'
import { useLocation } from 'wouter'

export default function Upload() {
  const [, setLocation] = useLocation()
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    onDragRender,
    video,
    uploaded,
    handleCancel
  } = useDragnDrop()

  const classNamesDnD = clsx(styles.upload_card, {
    [styles.reject]: isDragReject,
    [styles.accepted]: isDragAccept,
    [styles.uploaded]: uploaded
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target.description.value)
    const [error, data] = await publishVideo({
      userId: user.id,
      videoSrc: video,
      videoDescription:
        e.target.description.value.length > 4
          ? e.target.description.value
          : null
    })
    if (error) {
      setError(error.code)
      setTimeout(() => {
        setError(false)
      }, 2301)
      return console.log(error)
    }
    setLocation('/')
    console.log('PUBLICADO', data)
  }

  return (
    <div className={styles.upload_content}>
      <h1>Upload a video</h1>
      <p>Public a video</p>

      <form className={styles.upload_container} onSubmit={handleSubmit}>
        <div className={styles.uploader}>
          <div className={styles.upload}>
            <div className={styles.upload_btn}>
              <div className={classNamesDnD} {...getRootProps()}>
                <UploadIconB />
                {onDragRender()}
                <span className={styles.upload_card_text}>
                  Or drag and drop one
                </span>
                <span className={styles.upload_card_text}>Mp4 or WebM</span>
                <input
                  {...getInputProps()}
                  className={styles.upload_select_btn}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.form_container}>
          <label htmlFor='description'>Description</label>
          <input
            className={styles.description_input_form}
            type='text'
            name='description'
          />

          {error && (
            <Notification text='You need to upload and fill all the inputs' />
          )}

          <div className={styles.action_buttons_container}>
            {uploaded && (
              <button className={styles.button_cancel} onClick={handleCancel}>
                Cancel
              </button>
            )}
            <button className={styles.button_upload}>Upload!</button>
          </div>
        </div>
      </form>
    </div>
  )
}
