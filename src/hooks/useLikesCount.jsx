import { useState, useEffect } from 'react'
import { likeVideo, unlikeVideo, checkLike } from '../services'

export const useLikesCount = ({ userId, postId, likes }) => {
  const [likesNumber, setLikesNumber] = useState(likes)
  const [like, setLike] = useState(false)

  const toggleLike = (userId) => {
    if (!userId) return console.log('you need to loggin')
    setLike(!like)
    if (like) {
      unlikeVideo(postId, userId).then((res) =>
        setLikesNumber((prev) => prev - 1)
      )
    } else {
      likeVideo(postId, userId).then((res) =>
        setLikesNumber((prev) => prev + 1)
      )
    }
  }

  useEffect(() => {
    checkLike(postId, userId).then((data) => {
      const liked = data[1][0]?.likes?.find((likeUser) => likeUser === userId)
      liked ? setLike(true) : setLike(false)
    })
  }, [postId, userId])

  return { toggleLike, likesNumber, like }
}
