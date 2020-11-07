import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';
import styles from './Home.module.scss';
import background from 'assets/images/bg.jpg';

const Home = () => {
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
        <SearchBar />
      </div>
    </main>
  );
};

export default Home;
