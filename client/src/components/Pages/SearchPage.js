import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios'
import SearchCard from '../Cards/SearchCard';
import './Pages.css';

function isEmpty(obj) {
    if (obj.hasOwnProperty('songs')) {
        let empty = obj.songs.length + obj.albums.length + obj.artists.length + obj.playlists.length;
        return empty
    }
}


export default function SearchPage(props) {

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [filteredSongs, setFiltered] = useState([]);

    const [results, setResults] = useState([]);


    useEffect(() => {
        (async function fetchData() {
            const params = props.location.search.slice(8);
            if (params) {
                const { data } = await axios.get(`/search/${params}`)
                setResults(data);
                isEmpty(data);
            } else {
                setResults([])
            }
        })();
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
            {/* {results.map((result, i) => {
                return <div style={{ margin: '25px', width: 'fit-content' }} key={i}>
                    <SearchCard result={result} />
                </div>
            })}
            {(results.length === 0 && !props.location.search.slice(8)) && <h4>type to search for a song...</h4>}
            {(results.length === 0 && props.location.search.slice(8)) && <h4>no matching results</h4>} */}
            {results.songs && results.songs.length > 0 && <h2 className='search_title'>Songs</h2>}
            {
                results.songs && results.songs.map(song => {
                    return <div style={{ margin: '25px', width: 'fit-content' }} key={song.id}>
                        <SearchCard result={song} />
                    </div>
                })
            }
            {results.albums && results.albums.length > 0 && <h2 className='search_title'>Albums</h2>}
            {
                results.albums && results.albums.map(album => {
                    return <div style={{ margin: '25px', width: 'fit-content' }} key={album.id}>
                        <SearchCard result={album} />
                    </div>
                })
            }
            {results.artists && results.artists.length > 0 && <h2 className='search_title'>Artists</h2>}
            {
                results.artists && results.artists.map(artist => {
                    return <div style={{ margin: '25px', width: 'fit-content' }} key={artist.id}>
                        <SearchCard result={artist} />
                    </div>
                })
            }
            {results.playlists && results.playlists.length > 0 && <h2 className='search_title'>Playlists</h2>}
            {
                results.playlists && results.playlists.map(playlist => {
                    return <div style={{ margin: '25px', width: 'fit-content' }} key={playlist.id}>
                        <SearchCard result={playlist} />
                    </div>
                })
            }
            {!props.location.search.slice(8) && <h4>type to search for a song...</h4>}
            {(isEmpty(results) === 0 && props.location.search.slice(8)) && <h4>no matching results</h4>}
        </>
    );
}