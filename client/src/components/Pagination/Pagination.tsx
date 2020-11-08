import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

interface Props {
  pageSize: number;
  totalPages: number;
  currentPage: number;
  base: string;
}

const Pagination = ({ totalPages, currentPage, base }: Props) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <div className={styles.paginationWrapper}>
      <Link
        className={styles.changePage}
        aria-disabled={!hasPrevPage}
        to={`/${base}/${prevPage}`}
      >
        &#x2190; Prev
      </Link>
      <Link
        className={styles.changePage}
        aria-disabled={!hasNextPage}
        to={`/${base}/${nextPage}`}
      >
        Next &#x2192;
      </Link>
    </div>
  );
};

export default Pagination;
