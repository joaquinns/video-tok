import { useState } from 'react'

export default function usePlayer(videoRef) {
  const [playing, setPlaying] = useState(false)
  const handlePlay = () => {
    !playing && videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause()

    setPlaying(!playing)
  }

  return { playing, handlePlay }
}
