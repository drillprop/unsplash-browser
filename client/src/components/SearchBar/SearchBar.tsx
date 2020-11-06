import { useCombobox } from 'downshift';
import { useDebounce } from 'hooks/useDebounce';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { fetcher } from 'utils/fetcher';
import { UnsplashAutocompleteResponse } from '../../types/index';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { push } = useHistory();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data } = useQuery<UnsplashAutocompleteResponse[]>(
    ['autocomplete', debouncedSearchTerm],
    fetcher,
    {
      enabled: debouncedSearchTerm.length > 3,
    }
  );

  const {
    getComboboxProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    items: data?.map((suggestion) => suggestion.query) || [],
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue || '');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/search/${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label {...getLabelProps()}>
        Search image
        <input type='search' {...getInputProps()} />
        <div {...getComboboxProps()}>
          <ul {...getMenuProps()}>
            {isOpen &&
              searchTerm &&
              data?.map(({ query }, index) => (
                <li
                  key={`${query}${index}`}
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: '#bde4ff' }
                      : {}
                  }
                  {...getItemProps({ item: query, index })}
                >
                  <Link to={`/search/${query}`}>{query}</Link>
                </li>
              ))}
          </ul>
        </div>
      </label>
      <button type='submit'>search</button>
    </form>
  );
};

export default SearchBar;
