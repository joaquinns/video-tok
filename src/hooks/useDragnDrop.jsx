import { useState, useEffect } from 'react'
import { uploadVideo } from '../services'
import { useDropzone } from 'react-dropzone'

export const useDragnDrop = () => {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [video, setVideo] = useState(null)

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

  const onDragRender = () => {
    if (isDragReject) return <h3>{`can't upload this type of file`}</h3>
    if (isDragAccept) return <h3>Drop to upload!</h3>
    if (uploading) return <h3>Uploading...</h3>
    if (!uploading && !uploaded) return <h3>Uploaded!</h3>

    return <h3>Select a video to upload</h3>
  }

  return {
    video,
    getRootProps,
    getInputProps,
    onDragRender,
    isDragReject,
    isDragAccept,
    uploaded
  }
}
