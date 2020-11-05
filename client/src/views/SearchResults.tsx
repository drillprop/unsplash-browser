import React from 'react';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  searchphrase: string;
}

const SearchResults = () => {
  const { searchphrase } = useParams<ParamTypes>();
  return <div>Search Result for {searchphrase}</div>;
};

export default SearchResults;
