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
    .abortSignal(signal)
  console.log(videos)
  return [error, videos]
}

export const getUserVideos = async (userId, signal) => {
  const { data: videos, error } = await supabase
    .from('videos')
    .select(`*, user_id (*)`)
    .eq('user_id', `${userId}`)
    .abortSignal(signal)
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
  const { data: video, error } = await supabase
    .from('videos')
    .insert([{ user_id: userId, description: videoDescription, src: videoSrc }])

  return [error, video]
}

export const Logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) return console.error(error)
}
