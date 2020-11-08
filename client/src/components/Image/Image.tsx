import React, { useRef, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { Result } from '../../types/api';
import styles from './Image.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  photo: Result;
}

const Image = ({ photo }: Props) => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);
  return (
    <div>
      {isLoading && (
        <Blurhash
          hash={photo.blur_hash}
          width={imgRef.current?.width || 0}
          height={imgRef.current?.height || 0}
        />
      )}
      <Link
        key={photo.id}
        to={{
          pathname: `/photo/${photo.id}`,
          state: { background: location },
        }}
      >
        <img
          ref={imgRef}
          onLoad={() => setIsLoading(false)}
          src={photo.urls.small}
          alt={photo.alt_description || 'photography'}
          loading='lazy'
          className={styles.img}
        />
      </Link>
    </div>
  );
};

export default Image;
