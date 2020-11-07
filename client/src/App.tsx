import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'views/Home/Home';
import './styles/global.scss';
import Search from 'views/Search';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/search/:searchterm'>
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
