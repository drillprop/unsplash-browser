import React from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinnerContainer} />
    </div>
  );
};

export default LoadingSpinner;
