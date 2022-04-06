import { useState, useEffect } from 'react'
import { getUserVideos, getVideos } from '../services'

export const useGetVideos = ({ userId = null }) => {
  const [loading, setLoading] = useState(false)
  const [postVideos, setPostVideos] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchVideos = async () => {
      setLoading(true)
      const [error, videos] = userId
        ? await getUserVideos(userId, signal)
        : await getVideos(signal)
      if (error && error.code === 20) {
        return console.log('aborted')
      }

      if (error) setError(true)

      setPostVideos(videos)
      setLoading(false)
    }
    fetchVideos()

    return function cleanup() {
      controller.abort()
    }
  }, [userId])

  return {
    loading,
    postVideos,
    error
  }
}
