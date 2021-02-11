import React, { useState, useEffect } from 'react';
import './Pages.css';
import CarouselCard from '../Cards/CarouselCard';
import Slider from "react-slick";
import axios from 'axios'
import Controls from '../Controls/Controls';
import NavBar from '../NavBar/NavBar';

export default function PlaylistPage(props) {

    const [playlist, setPlaylist] = useState();
    const [playlistSongs, setSongs] = useState([]);

    useEffect(() => {
        (async function fetchData() {
            let play = await axios.get(`/playlists/${props.match.params.id}`);
            setPlaylist(play.data);
            let songs = await axios.get(`/playlists/${props.match.params.id}/songs`);
            songs = songs.data;
            setSongs(songs);
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
            <NavBar />
            <div>
                <h1 className='playlist_title'>{playlist && playlist.name}</h1>
                <h3>{playlist && ('Created at: ' + playlist.createdAt.slice(0, 10))}</h3>
                <img className='playlist_cover'
                    src={playlist && playlist.coverImg}
                    alt=''
                />
            </div>
            <div style={{ margin: 'auto', width: '1760px' }}>
                <Slider {...settings}>
                    {playlistSongs.map(song => {
                        return (
                            <div key={song.id} style={{ width: 220 }}>
                                <CarouselCard result={song} from={`?playlists=${props.match.params.id}`} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <Controls songs={playlistSongs} />
        </div>
    );
}