import { useRef, useState } from 'react'

export default function usePlayer() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const handlePlay = () => {
    playing ? videoRef.current.pause() : videoRef.current.play()
    setPlaying(!playing)
  }

  return { playing, handlePlay, videoRef }
}
