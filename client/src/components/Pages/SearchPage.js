import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios'
import SongCard from '../Cards/SongCard';
import './Pages.css';


export default function SearchPage() {

    const [topSongs, setSongs] = useState([]);

    useEffect(() => {
        (async function fetchData() {
            let songs = await axios.get('/topSongs');
            songs = songs.data;
            setSongs(songs);
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

    return (
        <>
            <NavBar />
            {topSongs.map((song) => {
                return <div style={{ margin: '25px', width: 'fit-content' }}>
                    <SongCard song={song} />
                </div>
            })}
        </>
    );
}