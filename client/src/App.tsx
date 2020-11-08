import ImageModal from 'components/ImageModal/ImageModal';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from 'views/Home/Home';
import NotFound from 'views/NotFound/NotFound';
import Search from 'views/Search/Search';
import './styles/global.scss';

const App = () => {
  const location = useLocation();
  // @ts-ignore
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route path='/search/:searchterm/:page?'>
          <Search />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && <Route path='/photo/:id' children={<ImageModal />} />}
    </>
  );
};

export default App;
