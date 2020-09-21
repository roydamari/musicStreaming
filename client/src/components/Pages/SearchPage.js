import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios'
import SearchCard from '../Cards/SearchCard';
import './Pages.css';


export default function SearchPage(props) {

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [filteredSongs, setFiltered] = useState([]);

    useEffect(() => {
        (async function fetchData() {
            let songs = await axios.get('/songs');
            setSongs(songs.data);
            let albums = await axios.get('/albums');
            setAlbums(albums.data);
            let artists = await axios.get('/artists');
            setArtists(artists.data);
            let playlists = await axios.get('/playlists');
            setPlaylists(playlists.data);
        })();
    }, []);

    useEffect(() => {
        const params = props.location.search.slice(8);
        let filtered;
        if (params) {
            filtered = songs.filter(song => song.title.toLowerCase().includes(params.toLowerCase()));
            filtered = filtered.concat(albums.filter(album => album.name.toLowerCase().includes(params.toLowerCase())))
            filtered = filtered.concat(artists.filter(artist => artist.name.toLowerCase().includes(params.toLowerCase())))
            filtered = filtered.concat(playlists.filter(playlist => playlist.name.toLowerCase().includes(params.toLowerCase())))
        } else {
            filtered = [];
        }
        setFiltered(filtered.slice(0, 20));
    }, [props.match])

    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 3,
        variableWidth: true,
        arrows: true,
    };

    return (
        <>
            <NavBar />
            {filteredSongs.map((result, i) => {
                return <div style={{ margin: '25px', width: 'fit-content' }} key={i}>
                    <SearchCard result={result} />
                </div>
            })}
            {(filteredSongs.length === 0 && !props.location.search.slice(8)) && <h4>type to search for a song...</h4>}
            {(filteredSongs.length === 0 && props.location.search.slice(8)) && <h4>no matching results</h4>}
        </>
    );
}