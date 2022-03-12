import { supabase } from './supabase'

const prefix = import.meta.env.VITE_SUPABASE_STORAGE_URL

export const getVideos = async () => {
  const { data: videos, error } = await supabase.from('videos').select(
    `
    *, user_id (*
    )
  `
  )
  console.log(videos)
  return [error, videos]
}

export const getUserVideos = async (userId) => {
  const { data: videos, error } = await supabase
    .from('videos')
    .select(`*, user_id (*)`)
    .eq('user_id', `${userId}`)
  // .or(`user_id.eq.${userId}`)
  console.log([error, videos])
  return [error, videos]
}

export const uploadVideo = async ({ videoFile }) => {
  const filename = window.crypto.randomUUID()
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(`uploads/${filename}.mp4`, videoFile)

  const videoURL = data?.Key ? `${prefix}${data.Key}` : ''

  return [error, videoURL]
}

export const publishVideo = async ({ userId, videoSrc, videoDescription }) => {
  const { data, error } = await supabase
    .from('videos')
    .insert([{ user_id: userId, description: videoDescription, src: videoSrc }])

  return [error, data]
}
