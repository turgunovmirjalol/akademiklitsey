import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
  fallbackSrc = ERROR_IMG_SRC,
  priority = false,
  objectFit = 'cover',
  loading,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const imageStyle: React.CSSProperties = {
    objectFit: objectFit,
    ...style,
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img 
          src={fallbackSrc} 
          alt="Error loading image" 
          className="max-w-[50%] max-h-[50%] opacity-20"
          {...rest} 
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={imageStyle}
      loading={priority ? undefined : (loading ?? 'lazy')}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={handleError}
      {...rest}
    />
  )
}
