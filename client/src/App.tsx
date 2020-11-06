import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'views/Home';
import Search from 'views/Search';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/search/:searchphrase'>
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
