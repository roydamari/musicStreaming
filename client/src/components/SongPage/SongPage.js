import React, { useState, useEffect } from 'react';
import './SongPage.css';
import SongCard from '../Cards/SongCard';
import Slider from "react-slick";
import axios from 'axios'
import YouTube from 'react-youtube';
import Controls from '../Controls/Controls';

export default function SongPage() {

    const [topSongs, setSongs] = useState([]);
    const [player, setPlayer] = useState();

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

    function _onReady(event) {
        setPlayer(event.target);
        console.log(event.target);
    }

    function PlayPause(playing) {
        if (playing) {
            player.pauseVideo();
            playing = false;
        } else {
            player.playVideo();
            playing = true;
        }
    }

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 0,
        },
    };


    return (
        <div>
            <div>
                <h1>Song Title</h1>
                <h3>Artist's name</h3>
                <img className='song_cover'
                    src='https://images.squarespace-cdn.com/content/56454c01e4b0177ad4141742/1458827329966-I6OAVNU68IOF0A4IHQVY/Im-Gonna-Be-500-Miles-Cover.jpg?content-type=image%2Fjpeg'
                    alt=''
                />
                <YouTube videoId="_83KqwEEGw4" opts={opts} onReady={_onReady} />;
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
            <Controls onPlay={PlayPause} player={player} />
        </div>
    );
}