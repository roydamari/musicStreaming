import React, { useState, useEffect } from 'react';
import './Pages.css';
import SongCard from '../Cards/SongCard';
import AlbumCard from '../Cards/AlbumCard';
import Slider from "react-slick";
import axios from 'axios'
import Controls from '../Controls/Controls';
import NavBar from '../NavBar/NavBar';

export default function ArtistPage(props) {

    const [artistSongs, setSongs] = useState([]);
    const [artistAlbums, setAlbums] = useState([]);
    const [artist, setArtist] = useState()

    useEffect(() => {
        (async function fetchData() {
            let currentArtist = await axios.get(`/artist/${props.match.params.id}`);
            setArtist(currentArtist.data[0]);
            let songs = await axios.get(`/artist/${props.match.params.id}/songs`);
            setSongs(songs.data);
            let albums = await axios.get(`/artist/${props.match.params.id}/albums`);
            setAlbums(albums.data);
        })();
    }, []);

    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 3,
        variableWidth: true,
        arrows: true,
    };

    const albumSettings = {
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
            <div className='flexContainer'>
                <div>
                    <h1>{artist && artist.name}</h1>
                    <h3>{artist && ('Since: ' + artist.created_at.slice(0, 10))}</h3>
                    <img className='artist_cover'
                        src={artist && artist.cover_img}
                        alt=''
                    />
                </div>
                <div style={{ margin: 'auto', width: '1200px' }}>
                    <div style={{ margin: '50px' }}>
                        <Slider {...albumSettings}>
                            {artistAlbums.map(album => {
                                return (
                                    <div key={album.id} style={{ width: 220 }}>
                                        <AlbumCard album={album} />
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div style={{ margin: '50px' }}>
                        <Slider {...settings}>
                            {artistSongs.map(song => {
                                return (
                                    <div key={song.id} style={{ width: 220 }}>
                                        <SongCard song={song} from={`?artist=${props.match.params.id}`} />
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
                <Controls songs={artistSongs} />
            </div >
        </>
    );
}