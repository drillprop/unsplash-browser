import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  base: string;
}

const Pagination = ({ pageSize, totalCount, currentPage, base }: Props) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <>
      <Link aria-disabled={!hasPrevPage} to={`/${base}/${prevPage}`}>
        &#x2190; Prev
      </Link>
      {/* {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          key={i}
          to={`/${base}/${i + 1}`}
        >
          {i + 1}
        </Link>
      ))} */}
      <Link aria-disabled={!hasNextPage} to={`/${base}/${nextPage}`}>
        Next &#x2192;
      </Link>
    </>
  );
};

export default Pagination;
