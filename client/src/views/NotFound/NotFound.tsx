import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main>
      <h1>Not Found</h1>
      <Link to='/'>Go Home</Link>
    </main>
  );
};

export default NotFound;
