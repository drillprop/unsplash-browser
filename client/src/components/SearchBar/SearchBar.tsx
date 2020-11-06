import { useCombobox } from 'downshift';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'hooks/useDebounce';
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
    items: data || [],
    itemToString: (item: any) => (item ? item.word : ''),
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue || '  ');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('called');
    push(`/search/${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label {...getLabelProps()}>
        Search image
        <div {...getComboboxProps()}>
          <input type='search' {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen &&
              data?.map((item, index) => (
                <li
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: '#bde4ff' }
                      : {}
                  }
                  key={`${item.query}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item.query}
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
