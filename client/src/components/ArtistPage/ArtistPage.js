import React, { useState, useEffect } from 'react';
import './ArtistPage.css';
import SongCard from '../Cards/SongCard';
import AlbumCard from '../Cards/AlbumCard';
import Slider from "react-slick";
import axios from 'axios'
import Controls from '../Controls/Controls';
import NavBar from '../NavBar/NavBar';
import YouTube from 'react-youtube';

export default function ArtistPage(props) {

    const [artistSongs, setSongs] = useState([]);
    const [artistAlbums, setAlbums] = useState([]);
    const [artist, setArtist] = useState()
    const [currentSong, setCurrent] = useState()
    const [player, setPlayer] = useState();
    const [nextSong, setNext] = useState();
    const [prevSong, setPrev] = useState();

    useEffect(() => {
        (async function fetchData() {
            let currentArtist = await axios.get(`/artist/${props.match.params.id}`);
            setArtist(currentArtist.data[0]);
            let songs = await axios.get(`/artist/${props.match.params.id}/songs`);
            setSongs(songs.data);
            let albums = await axios.get(`/artist/${props.match.params.id}/albums`);
            setAlbums(albums.data);
            setCurrent(songs.data[0]);
            setNext(songs.data[1]);
            setPrev(songs.data[songs.data.length - 1]);
        })();
    }, []);

    function playNext() {
        player.cueVideoById(nextSong.youtube_link);
        player.playVideo()
        const next = artistSongs.find(song => song.id === nextSong.id + 1)
        setPrev(currentSong);
        if (next) {
            setCurrent(nextSong);
            setNext(next)
        } else {
            setCurrent(artistSongs[0]);
            setNext(artistSongs[1])
        }
    }

    function playPrev() {
        player.cueVideoById(prevSong.youtube_link);
        player.playVideo()
        const prev = artistSongs.find(song => song.id === prevSong.id - 1);
        setNext(currentSong);
        if (prev) {
            setCurrent(prevSong);
            setPrev(prev);
        } else {
            setCurrent(artistSongs[artistSongs.length - 1]);
            setPrev(artistSongs[artistSongs.length - 2])
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
                                        <AlbumCard src='https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg'
                                            album={album} />
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
                                        <SongCard src='https://images.squarespace-cdn.com/content/56454c01e4b0177ad4141742/1458827329966-I6OAVNU68IOF0A4IHQVY/Im-Gonna-Be-500-Miles-Cover.jpg?content-type=image%2Fjpeg'
                                            song={song} />
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
                <Controls onPlay={PlayPause} player={player} currentSong={currentSong} skipSong={playNext} playPrev={playPrev} playing={true} />
                <YouTube videoId={currentSong && currentSong.youtube_link} opts={opts} onReady={_onReady} onEnd={playNext} />
            </div >
        </>
    );
}