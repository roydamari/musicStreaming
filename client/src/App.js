import React from 'react';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import SongPage from './components/SongPage/SongPage';
import AlbumPage from './components/AlbumPage/AlbumPage';
import ArtistPage from './components/ArtistPage/ArtistPage';
import PlaylistPage from './components/PlaylistPage/PlaylistPage';
import Page404 from './components/Page404/Page404';
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
          <Route path="/album" exact render={(props) => (
            <AlbumPage {...props} />
          )} />
          <Route path="/artist" exact render={(props) => (
            <ArtistPage {...props} />
          )} />
          <Route path="/playlist" exact render={(props) => (
            <PlaylistPage {...props} />
          )} />
          <Route path='/404' component={Page404} />
          <Redirect from='*' to='/404' />
        </Switch>
      </Router>
    </>
  );
}

export default App;
