import React, { useState, useEffect } from 'react';
import './PlaylistPage.css';
import SongCard from '../Cards/SongCard';
import Slider from "react-slick";
import axios from 'axios'
import Controls from '../Controls/Controls';
import NavBar from '../NavBar/NavBar';
import YouTube from 'react-youtube';

export default function PlaylistPage(props) {

    const [playlist, setPlaylist] = useState();
    const [playlistSongs, setSongs] = useState([]);
    const [currentSong, setCurrent] = useState()
    const [player, setPlayer] = useState();
    const [nextSong, setNext] = useState();
    const [prevSong, setPrev] = useState();

    useEffect(() => {
        (async function fetchData() {
            let play = await axios.get(`/playlist/${props.match.params.id}`);
            setPlaylist(play.data[0]);
            let songs = await axios.get(`/playlist/${props.match.params.id}/songs`);
            songs = songs.data;
            setSongs(songs);
            setCurrent(songs[0]);
            setNext(songs[1]);
            setPrev(songs[songs.length - 1]);
        })();
    }, []);


    function playNext() {
        player.cueVideoById(nextSong.youtube_link);
        player.playVideo()
        const next = playlistSongs.find((song, i) => i === playlistSongs.indexOf(nextSong) + 1)
        setPrev(currentSong);
        if (next) {
            setCurrent(nextSong);
            setNext(next)
        } else {
            setCurrent(playlistSongs[0]);
            setNext(playlistSongs[1])
        }
    }

    function playPrev() {
        player.cueVideoById(prevSong.youtube_link);
        player.playVideo()
        const prev = playlistSongs.find((song, i) => i === playlistSongs.indexOf(prevSong) - 1);
        setNext(currentSong);
        if (prev) {
            setCurrent(prevSong);
            setPrev(prev);
        } else {
            setCurrent(playlistSongs[playlistSongs.length - 1]);
            setPrev(playlistSongs[playlistSongs.length - 2])
        }
    }

    function _onReady(event) {
        setPlayer(event.target);
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
                <h1 className='playlist_title'>{playlist && playlist.name}</h1>
                <h3>{playlist && ('Created at: ' + playlist.created_at.slice(0, 10))}</h3>
                <img className='album_cover'
                    src={playlist && playlist.cover_img}
                    alt=''
                />
            </div>
            <div style={{ margin: 'auto', width: '1760px' }}>
                <Slider {...settings}>
                    {playlistSongs.map(song => {
                        return (
                            <div key={song.id} style={{ width: 220 }}>
                                <SongCard song={song} from={`?playlist=${props.match.params.id}`} />
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