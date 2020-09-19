import React, { useState, useEffect } from 'react';
import './SongPage.css';
import SongCard from '../Cards/SongCard';
import Slider from "react-slick";
import axios from 'axios'
import YouTube from 'react-youtube';
import Controls from '../Controls/Controls';
import NavBar from '../NavBar/NavBar';

export default function SongPage(props) {

    const [suggestedSongs, setSongs] = useState([]);
    const [currentSong, setCurrent] = useState()
    const [player, setPlayer] = useState();
    const [nextSong, setNext] = useState();
    const [prevSong, setPrev] = useState();

    const query = props.location.search;
    const from = query.slice(1, query.length - 2);
    const id = props.location.search.slice(query.length - 1);

    useEffect(() => {
        (async function fetchData() {
            let songs = await axios.get(`/${from}/${id}/songs`);
            songs = songs.data;
            setSongs(songs);
            const current = songs.find(song => props.match.params.id === song.youtube_link);
            setCurrent(current);
            const next = songs.find((song, i) => i === songs.indexOf(current) + 1);
            if (next) {
                setNext(next.youtube_link);
            } else {
                setNext(songs[0].youtube_link);
            }
            const prev = songs.find((song, i) => i === songs.indexOf(current) - 1)
            if (prev) {
                setPrev(prev.youtube_link);
            } else {
                setPrev(songs[songs.length - 1].youtube_link);
            }
        })();
    }, [props.match.params.id])


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


    function skipSong() {
        window.location.href = `/song/${nextSong}?${from}=${id}`;
    }

    function playPrev() {
        window.location.href = `/song/${prevSong}?${from}=${id}`;
    }


    return (
        <div>
            <NavBar />
            <div>
                <h1>{currentSong && currentSong.title}</h1>
                <h3>{currentSong && currentSong.album_name}</h3>
                <h3>{currentSong && currentSong.artist_name}</h3>
                <img className='song_cover'
                    src={`https://img.youtube.com/vi/${currentSong && currentSong.youtube_link}/hqdefault.jpg`}
                    alt=''
                />
                <YouTube videoId={props.match.params.id} opts={opts} onReady={_onReady} onEnd={skipSong} />
            </div>
            <div style={{ margin: 'auto', width: '1760px' }}>
                <Slider {...settings}>
                    {suggestedSongs.map(song => {
                        return (
                            <div key={song.id} style={{ width: 220 }}>
                                <SongCard song={song} from={`?${from}=${id}`} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <Controls onPlay={PlayPause} player={player} currentSong={currentSong} skipSong={skipSong} playPrev={playPrev} playing={true} />
        </div>
    );
}