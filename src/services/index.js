import { supabase } from './supabase'

const prefix = import.meta.env.VITE_SUPABASE_STORAGE_URL

export const getVideos = async () => {
  const { data: videos, error } = await supabase.from('videos').select(`
    *
    )
  `)
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

  console.log(await supabase.from('videos').select(`src, user_id(email)`))

  return [error, data]
}
