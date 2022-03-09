import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'
import UploadIconB from '../../components/Icons/UploadIconB'
import styles from './upload.module.css'
import { publishVideo, uploadVideo } from '../../services'
import { useAuth } from '../../context/AuthContext'

export default function Upload() {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [video, setVideo] = useState('')
  const { user } = useAuth()

  const onDrop = async (files) => {
    console.log(files)
    const [file] = files
    setUploading(true)
    const [error, videoURL] = await uploadVideo({ videoFile: file })
    setUploading(false)
    setUploaded(true)
    setVideo(videoURL)
    console.log(error)
    console.log('uploaded!')
  }

  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      disabled: uploading || uploaded,
      maxFiles: 1,
      accept: 'video/mp4,video/x-m4v,video/*',
      onDrop
    })

  useEffect(() => {
    if (isDragReject) console.log('no compa')
  }, [isDragReject])

  const classNamesDnD = clsx(styles.upload_card, {
    [styles.reject]: isDragReject,
    [styles.accepted]: isDragAccept,
    [styles.uploaded]: uploaded
  })

  const onDragRender = () => {
    if (isDragReject) return <h3>{`can't upload this type of file`}</h3>
    if (isDragAccept) return <h3>Drop to upload!</h3>
    if (uploading) return <h3>Uploading...</h3>
    if (!uploading && !uploaded) return <h3>Uploaded!</h3>

    return <h3>Select a video to upload</h3>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target.description.value)
    const [error, data] = await publishVideo({
      userId: user.id,
      videoSrc: video,
      videoDescription: e.target.description.value
    })
    if (error) console.error(error)
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

          <button>Upload!</button>
        </div>
      </form>
    </div>
  )
}
