import { supabase } from './supabase'

export const getVideos = async () => {
  const { data: videos, error } = await supabase.from('videos').select(`
    *,
    users (
      username
    )
  `)
  return [error, videos]
}
