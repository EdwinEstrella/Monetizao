import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  lazy?: boolean
}

export function OptimizedImage({
  fallbackSrc = '/placeholder.jpg',
  lazy = true,
  alt,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(props.src)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
          setIsLoading(false)
        }}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${props.className || ''}`}
      />
    </div>
  )
}