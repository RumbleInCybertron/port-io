import React from "react";
import './avatar.css';
import Image from "next/image";

export interface AvatarProps {
  name: string;
  image?: {
    src: string;
    width?: number;
    height?: number;
  };
  shape: 'circle' | 'square';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Avatar = ({ name, image, shape, size }: AvatarProps) => {
  const initials = name.split(' ').map((word) => word[0]).join('');
  return (
    <div className={['avatar', `avatar--shape-${shape}`, `avatar--size-${size}`].join(' ')}>
      {image ? <Image className='avatar-image' src={image.src} width={image.width} height={image.height} alt={name} /> : <>{initials}</>}
    </div>
  )
}