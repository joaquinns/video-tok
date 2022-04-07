import { supabase } from './supabase'

const prefix = import.meta.env.VITE_SUPABASE_STORAGE_URL

export const getVideos = async (signal) => {
  const { data: videos, error } = await supabase
    .from('videos')
    .select(
      `
    *, user_id (*
    )
    `
    )
    .order('created_at', { ascending: false })
    .abortSignal(signal)
  console.log(videos)
  return [error, videos]
}

export const getUserVideos = async (userId, signal) => {
  const { data: videos, error } = await supabase
    .from('videos')
    .select(`*, user_id (*)`)
    .eq('user_id', `${userId}`)
    .order('created_at', { ascending: false })
    .abortSignal(signal)
  // .or(`user_id.eq.${userId}`)
  console.log([error, videos])
  return [error, videos]
}

export const uploadVideo = async ({ videoFile }) => {
  const typeFile = videoFile?.type
  if (typeFile !== 'video/mp4') {
    return [{ error: 'file type error' }, null]
  }
  const filename = window.crypto.randomUUID()
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(`uploads/${filename}.mp4`, videoFile)

  const videoURL = data?.Key ? `${prefix}${data.Key}` : ''

  return [error, videoURL]
}

export const publishVideo = async ({ userId, videoSrc, videoDescription }) => {
  const { data: video, error } = await supabase
    .from('videos')
    .insert([{ user_id: userId, description: videoDescription, src: videoSrc }])

  return [error, video]
}

export const deleteVideo = async (postId) => {
  const { data, error } = await supabase
    .from('videos')
    .delete()
    .match({ id: postId })

  if (error) {
    return [{ error: 'Error deleting the data' }]
  }

  console.log(data)
}

export const likeVideo = async (postId, userId) => {
  const { error, data } = await supabase
    .from('videos')
    .update({ likes: `{${userId}}` })
    .eq('id', postId)

  console.log(data)

  return [error, data]
}

export const unlikeVideo = async (postId, userId) => {
  const { error, data } = await supabase
    .from('videos')
    .update({ likes: `{${[].filter((id) => id !== userId)}}` })
    .eq('id', postId)
  console.log(postId, userId)
  console.log(error, data)
  return [error, data]

  /*   const { error, data } = await supabase
    .from('videos')
    .update({ likes: [] })
    .eq('id', postId)

  console.log(error, data)

  */
}

export const checkLike = async (postId, userId) => {
  const { error, data } = await supabase
    .from('videos')
    .select('likes')
    .contains('likes', [userId])
    .eq('id', postId)

  return [error, data]
}

export const Logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) return console.error(error)
}
