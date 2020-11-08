import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Result } from '../../types/api';
import styles from './Image.module.scss';

interface Props {
  photo: Result;
}

const Image = ({ photo }: Props) => {
  const location = useLocation();
  return (
    <div>
      <Link
        key={photo.id}
        to={{
          pathname: `/photo/${photo.id}`,
          state: { background: location },
        }}
      >
        <img
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
