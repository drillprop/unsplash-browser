import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBlurhash } from '../../hooks/useBlurhash';
import { Result } from '../../types/api';
import styles from './Image.module.scss';

interface Props {
  photo: Result;
}

const Image = ({ photo }: Props) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const hashUrl = useBlurhash(isImgLoaded ? null : photo.blur_hash);
  const [height, setHeight] = useState(0);
  const location = useLocation();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const divider = photo.width / ref.current.clientWidth;
    setHeight(photo.height / divider);
  }, [photo.height, photo.width]);

  return (
    <div
      ref={ref}
      style={{
        height,
      }}
    >
      <Link
        key={photo.id}
        to={{
          pathname: `/photo/${photo.id}`,
          state: { background: location },
        }}
      >
        <img
          onLoad={() => setIsImgLoaded(true)}
          width={ref.current?.clientWidth}
          height={height}
          style={{
            background: `url(${hashUrl})`,
            backgroundSize: `${ref.current?.clientWidth}px ${height}px`,
            backgroundRepeat: 'no-repeat',
          }}
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
