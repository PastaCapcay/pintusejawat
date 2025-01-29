import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getEmbedUrl = (url: string, type: 'VIDEO' | 'DOCUMENT'): string => {
  if (type === 'VIDEO') {
    // Convert YouTube URL to embed URL
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]*)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  } else {
    // Convert Google Drive URL to embed URL
    const fileId = url.match(/\/d\/(.*?)(\/|$)/)?.[1]
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url
  }
}
