import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import React from 'react';

type PictureProps = {
  src: ImageProps['src'];
  alt: string;
  className?: string;

};

const Picture: React.FC<PictureProps> = ({src,alt,className}) => {
  return (
    <Image
      className={cn(className)}
      src={src}
      alt={alt || "image"}
      unoptimized={true}
      width={600}
      height={200}
      layout="intrinsic"
    />
  );
};

export default Picture;