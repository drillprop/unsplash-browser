import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Pagination from 'components/Pagination/Pagination';
import SearchBar from 'components/SearchBar/SearchBar';
import SearchResults from 'components/SearchResults/SearchResults';
import React from 'react';
import { usePaginatedQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { UnsplashSearchResponse } from 'types/api';
import { fetcher } from 'utils/fetcher';
import styles from './Search.module.scss';

interface ParamTypes {
  searchterm: string;
  page?: string;
}

const Search = () => {
  const { searchterm, page } = useParams<ParamTypes>();

  const { data, isLoading } = usePaginatedQuery<UnsplashSearchResponse>(
    [`search/${searchterm}`, page],
    fetcher
  );

  const term = searchterm.split('-').join(' ');
  const capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1);

  return (
    <main className={styles.searchMain}>
      <div className={styles.searchbarWrapper}>
        <SearchBar small />
      </div>
      <h1 className={styles.searchTerm}>{capitalizedTerm}</h1>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <>
          {data && <SearchResults data={data} />}
          {data?.results.length ? (
            <Pagination
              currentPage={Number(page || 1)}
              pageSize={15}
              totalPages={data.total_pages}
              base={`search/${searchterm}`}
            />
          ) : null}
          {!data?.results.length && !isLoading ? (
            <>
              <h2 className={styles.noImages}>No images found</h2>
            </>
          ) : null}
        </>
      )}
    </main>
  );
};

export default Search;
