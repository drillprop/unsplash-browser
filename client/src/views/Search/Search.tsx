import Pagination from 'components/Pagination/Pagination';
import SearchBar from 'components/SearchBar/SearchBar';
import SearchResults from 'components/SearchResults/SearchResults';
import React from 'react';
import { useQuery } from 'react-query';
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

  const { data } = useQuery<UnsplashSearchResponse>(
    ['search', `${searchterm}/${page || 1}`],
    fetcher
  );

  const term = searchterm.split('-').join(' ');
  const capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1);

  return (
    <main className={styles.searchMain}>
      <div className={styles.searchbarWrapper}>
        <SearchBar small />
      </div>
      <h1>{capitalizedTerm}</h1>
      {data ? (
        <>
          <SearchResults data={data} />
          <Pagination
            currentPage={Number(page || 1)}
            pageSize={15}
            totalCount={data.total}
            base={`search/${searchterm}`}
          />
        </>
      ) : null}
    </main>
  );
};

export default Search;
