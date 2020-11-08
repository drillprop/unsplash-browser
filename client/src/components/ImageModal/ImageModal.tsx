import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { UnsplashPhotoResponse } from '../../types/api';
import { fetcher } from '../../utils/fetcher';
import styles from './ImageModal.module.scss';

import { ReactComponent as PinIcon } from 'assets/icons/pin-icon.svg';
import clsx from 'clsx';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

interface ParamTypes {
  id: string;
}

const ImageModal = () => {
  const history = useHistory();
  const [zoom, setZoom] = useState(false);
  const { id } = useParams<ParamTypes>();
  const { data, isLoading } = useQuery<UnsplashPhotoResponse>(
    ['photo', id],
    fetcher
  );

  const back = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      history.goBack();
    }
  };

  return (
    <div className={styles.modalShadow} onClick={back}>
      <div className={styles.modalWrapper}>
        <button
          className={styles.closeModalButton}
          onClick={back}
          title='close modal'
        >
          &times;
        </button>
        {isLoading && <LoadingSpinner />}
        {!isLoading && data && (
          <>
            <header className={styles.modalHeader}>
              <img
                className={styles.authorImage}
                src={data.user.profile_image.small}
                alt={data.user.name}
              />
              <h2 className={styles.authorName}>{data.user.name}</h2>
              <p className={styles.authorNick}>@{data.user.username}</p>
            </header>
            <figure className={styles.figureWrapper}>
              <img
                className={clsx(styles.figureImage, { [styles.zoomed]: zoom })}
                src={data.urls.regular}
                onClick={() => setZoom(!zoom)}
                alt={
                  data.alt_description || `unsplash photo by ${data.user.name}`
                }
              />
              <figcaption className={styles.figureLocation}>
                {data.location.title && <PinIcon />} {data.location.title}
              </figcaption>
            </figure>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
