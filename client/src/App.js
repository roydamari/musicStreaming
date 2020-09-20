import React from 'react';
import './App.css';
import HomePage from './components/Pages/HomePage';
import SongPage from './components/Pages/SongPage';
import AlbumPage from './components/Pages/AlbumPage';
import ArtistPage from './components/Pages/ArtistPage';
import PlaylistPage from './components/Pages/PlaylistPage';
import Page404 from './components/Pages/Page404';
import SearchPage from './components/Pages/SearchPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';



function App() {

  return (
    <>
      <Router>
        <Switch >
          <Route path="/" exact render={(props) => (
            <HomePage {...props} />
          )} />
          <Route path="/song/:id" exact render={(props) => (
            <SongPage {...props} />
          )} />
          <Route path={`/album/:id`} exact render={(props) => (
            <AlbumPage {...props} />
          )} />
          <Route path="/artist/:id" exact render={(props) => (
            <ArtistPage {...props} />
          )} />
          <Route path="/playlist/:id" exact render={(props) => (
            <PlaylistPage {...props} />
          )} />
          <Route path="/search" exact render={(props) => (
            <SearchPage {...props} />
          )} />
          <Route path='/404' component={Page404} />
          <Redirect from='*' to='/404' />
        </Switch>
      </Router>
    </>
  );
}

export default App;
