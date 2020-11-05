import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import SearchResults from './views/SearchResults';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/search/:searchphrase'>
            <SearchResults />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
