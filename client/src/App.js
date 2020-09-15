import React from 'react';
import './App.css';
import Controls from './components/Controls/Controls';
import HomePage from './components/HomePage/HomePage';
import SongPage from './components/SongPage/SongPage';
import AlbumPage from './components/AlbumPage/AlbumPage';
import ArtistPage from './components/ArtistPage/ArtistPage';
import PlaylistPage from './components/PlaylistPage/PlaylistPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <Switch >
          <Route path="/" exact render={(props) => (
            <HomePage {...props} />
          )} />
          <Route path="/song" exact render={(props) => (
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
        </Switch>
      </Router>
      <Controls />
    </>
  );
}

export default App;
