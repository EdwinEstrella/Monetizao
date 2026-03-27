'use client'

import * as React from 'react'

interface YouTubeVideoProps {
  videoId: string
  title: string
  className?: string
  autoPlay?: boolean
}

export function YouTubeVideo({ videoId, title, className, autoPlay = false }: YouTubeVideoProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=${autoPlay ? 1 : 0}&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 h-full w-full border-0"
        />
      </div>
    </div>
  )
}