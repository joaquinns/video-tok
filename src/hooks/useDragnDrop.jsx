import { useState, useEffect } from 'react'
import { uploadVideo } from '../services'
import { useDropzone } from 'react-dropzone'
import Spinner from '../components/Spinner'

export const useDragnDrop = () => {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [video, setVideo] = useState(null)
  const [reject, setReject] = useState(false)

  const onDrop = async (files) => {
    console.log(files)
    const [file] = files
    setUploading(true)
    const [error, videoURL] = await uploadVideo({ videoFile: file })
    setUploading(false)
    if (error) {
      return handleCancel()
    }
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

  const handleCancel = () => {
    setUploaded(false)
    setReject(false)
    setUploading(false)
    setVideo(null)
  }

  const onDragRender = () => {
    if (isDragReject || reject)
      return <h3>can&apos;t upload this type of file</h3>
    if (isDragAccept) return <h3>Drop to upload!</h3>
    if (uploading) return <Spinner />
    if (!uploading && uploaded) return <h3>Uploaded!</h3>

    return <h3>Select a video to upload</h3>
  }

  return {
    video,
    getRootProps,
    getInputProps,
    onDragRender,
    isDragReject,
    isDragAccept,
    uploaded,
    reject,
    handleCancel
  }
}
