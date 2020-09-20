import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SongCard from '../Cards/SongCard';
import AlbumCard from '../Cards/AlbumCard';
import ArtistCard from '../Cards/ArtistCard';
import PlaylistCard from '../Cards/PlaylistCard';
import Controls from '../Controls/Controls';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import './Pages.css';

export default function HomePage() {
    const [topSongs, setSongs] = useState([]);
    const [topAlbums, setAlbums] = useState([]);
    const [topArtists, setArtists] = useState([]);
    const [topPlaylists, setPlaylists] = useState([]);


    useEffect(() => {
        (async function fetchData() {
            let songs = await axios.get('/topSongs');
            songs = songs.data;
            setSongs(songs);
            let albums = await axios.get('/topAlbums');
            setAlbums(albums.data);
            let artists = await axios.get('/topArtists');
            setArtists(artists.data);
            let playlists = await axios.get('/topPlaylists');
            setPlaylists(playlists.data);
        })();
    }, []);


    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 3,
        variableWidth: true,
        arrows: true,
    };

    const songSettings = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 4,
        variableWidth: true,
        arrows: true,
    };

    return (
        <>
            <NavBar />
            <div style={{ width: '1760px', margin: 'auto', paddingBottom: '110px' }} className='home_container'>
                <h1 className='top_title'>Top Songs</h1>
                <Slider {...songSettings}>
                    {topSongs.map(song => {
                        return (
                            <div key={song.id} style={{ width: 220 }}>
                                <SongCard song={song} />
                            </div>
                        );
                    })}
                </Slider>
                <h1 className='top_title'>Top Albums</h1>
                <Slider {...settings}>
                    {topAlbums.map((album, i) => {
                        return (
                            <div key={i} style={{ width: 220 }}>
                                <AlbumCard album={album} />
                            </div>
                        );
                    })}
                </Slider>
                <h1 className='top_title'>Top Artists</h1>
                <Slider {...settings}>
                    {topArtists.map((artist, i) => {
                        return (
                            <div key={i} style={{ width: 220 }}>
                                <ArtistCard artist={artist} />
                            </div>
                        );
                    })}
                </Slider>
                <h1 className='top_title'>Top Playlists</h1>
                <Slider {...settings}>
                    {topPlaylists.map((playlist, i) => {
                        return (
                            <div key={i} style={{ width: 220 }}>
                                <PlaylistCard playlist={playlist} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <Controls songs={topSongs} />
        </>
    );
}