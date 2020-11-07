import { ReactComponent as SearchIcon } from 'assets/icons/search-icon.svg';
import clsx from 'clsx';
import { useCombobox } from 'downshift';
import { useDebounce } from 'hooks/useDebounce';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { UnsplashAutocompleteResponse } from 'types/api';
import { convertSpacesToDashes } from 'utils/convertSpacesToDashes';
import { fetcher } from 'utils/fetcher';
import styles from './SearchBar.module.scss';

type Props = {
  small?: boolean;
};

const SearchBar = ({ small }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(false);

  const { push } = useHistory();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data } = useQuery<UnsplashAutocompleteResponse[]>(
    ['autocomplete', debouncedSearchTerm],
    fetcher,
    {
      enabled: debouncedSearchTerm.length >= 3,
    }
  );

  const {
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    isOpen,
  } = useCombobox({
    items: data?.map((suggestion) => suggestion.query) || [],
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue || '');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) {
      push(`/search/${convertSpacesToDashes(searchTerm)}`);
    }
  };

  return (
    <>
      <form
        className={clsx(
          styles.form,
          isActive && styles.active,
          small && styles.small
        )}
        onSubmit={handleSubmit}
      >
        <button
          title='Search Image'
          className={styles.searchButton}
          type='submit'
        >
          <SearchIcon className={clsx({ [styles.active]: isActive })} />
        </button>
        <input
          type='search'
          required
          placeholder='Search free high-resolution photos'
          {...getInputProps()}
          className={styles.searchInput}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      </form>
      <div {...getComboboxProps()} className={styles.autocompleteBox}>
        <ul {...getMenuProps()} className={styles.autocompleteList}>
          {isOpen &&
            searchTerm &&
            data?.map(({ query }, index) => (
              <li
                key={`${query}${index}`}
                {...getItemProps({ item: query, index })}
                className={styles.autocompleteItem}
              >
                <Link to={`/search/${convertSpacesToDashes(query)}`}>
                  {query}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
