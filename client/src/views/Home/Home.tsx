import background from 'assets/images/bg.jpg';
import SearchBar from 'components/SearchBar/SearchBar';
import { useWindowSize } from 'hooks/useWindowSize';
import React from 'react';
import styles from './Home.module.scss';

const Home = () => {
  const { width } = useWindowSize();
  return (
    <main className={styles.main}>
      <img
        className={styles.heroBackground}
        src={background}
        alt=' hero background'
      />
      <div className={styles.heroWrapper}>
        <header>
          <h1 className={styles.heroTitle}>Unsplash</h1>
          <p className={styles.heroText}>
            The internet’s source of freely-usable images.
          </p>
          <p className={styles.heroText}>Powered by creators everywhere.</p>
        </header>
        <section className={styles.searchBarWrapper}>
          <SearchBar small={width! < 600} />
        </section>
      </div>
    </main>
  );
};

export default Home;
