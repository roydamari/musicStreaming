import React, { useState, useEffect } from 'react';
import './ArtistPage.css';
import SongCard from '../Cards/SongCard';
import AlbumCard from '../Cards/AlbumCard';
import Slider from "react-slick";
import axios from 'axios'

export default function ArtistPage() {

    const [topSongs, setSongs] = useState([]);
    const [topAlbums, setAlbums] = useState([]);
    useEffect(() => {
        (async function fetchData() {
            let songs = await axios.get('/topSongs');
            setSongs(songs.data);
            let albums = await axios.get('/topAlbums');
            setAlbums(songs.data);
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

    return (
        <div className='flexContainer'>
            <div>
                <h1>Song Title</h1>
                <h3>Artist's name</h3>
                <img className='artist_cover'
                    src='https://content.api.news/v3/images/bin/ba49fee5bc802f0a32a9415fef635f71'
                />
            </div>
            <div style={{ margin: 'auto', width: '1200px' }}>
                <div style={{ margin: '50px' }}>
                    <Slider {...settings}>
                        {topAlbums.map(album => {
                            return (
                                <div key={album.id} style={{ width: 220 }}>
                                    <AlbumCard src='https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg'
                                        album={album} />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <div style={{ margin: '50px' }}>
                    <Slider {...settings}>
                        {topSongs.map(song => {
                            return (
                                <div key={song.id} style={{ width: 220 }}>
                                    <SongCard src='https://images.squarespace-cdn.com/content/56454c01e4b0177ad4141742/1458827329966-I6OAVNU68IOF0A4IHQVY/Im-Gonna-Be-500-Miles-Cover.jpg?content-type=image%2Fjpeg'
                                        song={song} />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div >
    );
}