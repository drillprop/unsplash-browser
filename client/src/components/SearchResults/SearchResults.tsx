import Image from 'components/Image/Image';
import React from 'react';
import Masonry from 'react-masonry-css';
import { UnsplashSearchResponse } from 'types/api';
import styles from './SearchResults.module.scss';

interface Props {
  data: UnsplashSearchResponse;
}

const breakpointColumnsObj = {
  default: 3,
  900: 2,
  700: 1,
};

const SearchResults = ({ data }: Props) => {
  return (
    <section>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {data?.results.map((photo) => (
          <Image key={photo.id} photo={photo} />
        ))}
      </Masonry>
    </section>
  );
};

export default SearchResults;
