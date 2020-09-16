import React, { useState, useEffect } from 'react';
import './PlaylistPage.css';
import SongCard from '../Cards/SongCard';
import Slider from "react-slick";
import axios from 'axios'
import Controls from '../Controls/Controls';

export default function PlaylistPage() {

    const [topSongs, setSongs] = useState([]);
    useEffect(() => {
        (async function fetchData() {
            let songs = await axios.get('/topSongs');
            setSongs(songs.data);
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
        <div>
            <div>
                <h1 className='playlist_title'>Album Title</h1>
                <img className='album_cover'
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsn322z_Dw58yJfDO_1OpN5Uf32nBpy-lKrg&usqp=CAU'
                    alt=''
                />
            </div>
            <div style={{ margin: 'auto', width: '1760px' }}>
                <Slider {...settings}>
                    {topSongs.map(song => {
                        return (
                            <div key={song.id} style={{ width: 220 }}>
                                <SongCard src='https://images.squarespace-cdn.com/content/56454c01e4b0177ad4141742/1458827329966-I6OAVNU68IOF0A4IHQVY/Im-Gonna-Be-500-Miles-Cover.jpg?content-type=image%2Fjpeg' song={song} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <Controls />
        </div>
    );
}