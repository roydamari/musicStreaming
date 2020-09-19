import React, { useState, useEffect } from 'react';
import './AlbumPage.css';
import SongCard from '../Cards/SongCard';
import Slider from "react-slick";
import axios from 'axios'
import Controls from '../Controls/Controls';
import NavBar from '../NavBar/NavBar';
import YouTube from 'react-youtube';

export default function AlbumPage(props) {

    const [albumSongs, setSongs] = useState([]);
    const [currentAlbum, setAlbum] = useState()
    const [currentSong, setCurrent] = useState()
    const [player, setPlayer] = useState();
    const [nextSong, setNext] = useState();
    const [prevSong, setPrev] = useState();

    useEffect(() => {
        (async function fetchData() {
            let album = await axios.get(`/album/${props.match.params.id}`);
            setAlbum(album.data[0]);
            console.log(album.data[0]);
            let songs = await axios.get(`/album/${props.match.params.id}/songs`);
            setSongs(songs.data);
            setCurrent(songs.data[0]);
            setNext(songs.data[1]);
            setPrev(songs.data[songs.data.length - 1]);
        })();
    }, []);


    function playNext() {
        player.cueVideoById(nextSong.youtube_link);
        player.playVideo()
        const next = albumSongs.find(song => song.id === nextSong.id + 1)
        setPrev(currentSong);
        if (next) {
            setCurrent(nextSong);
            setNext(next)
        } else {
            setCurrent(albumSongs[0]);
            setNext(albumSongs[1])
        }
    }

    function playPrev() {
        player.cueVideoById(prevSong.youtube_link);
        player.playVideo()
        const prev = albumSongs.find(song => song.id === prevSong.id - 1);
        setNext(currentSong);
        if (prev) {
            setCurrent(prevSong);
            setPrev(prev);
        } else {
            setCurrent(albumSongs[albumSongs.length - 1]);
            setPrev(albumSongs[albumSongs.length - 2])
        }
    }

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
            autoplay: 1,
        },
    };

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
                <h1>{currentAlbum && currentAlbum.name}</h1>
                <h3>{currentAlbum && currentAlbum.artist_name}</h3>
                <img className='album_cover'
                    src={currentAlbum && currentAlbum.cover_img}
                    alt=''
                />
            </div>
            <div style={{ margin: 'auto', width: '1760px' }}>
                <Slider {...settings}>
                    {albumSongs.map(song => {
                        return (
                            <div key={song.id} style={{ width: 220 }}>
                                <SongCard song={song} from={`?album=${props.match.params.id}`} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <Controls onPlay={PlayPause} player={player} currentSong={currentSong} skipSong={playNext} playPrev={playPrev} playing={true} />
            <YouTube videoId={currentSong && currentSong.youtube_link} opts={opts} onReady={_onReady} onEnd={playNext} />
        </div>
    );
}