import React, { useState, useEffect } from 'react';
import './Pages.css';
import CarouselCard from '../Cards/CarouselCard';
import Slider from "react-slick";
import axios from 'axios'
import Controls from '../Controls/Controls';
import NavBar from '../NavBar/NavBar';

export default function SongPage(props) {

    const [suggestedSongs, setSongs] = useState([]);
    const [currentSong, setCurrent] = useState();

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
            </div>
            <div style={{ margin: 'auto', width: '1760px' }}>
                <Slider {...settings}>
                    {suggestedSongs.map(song => {
                        return (
                            <div key={song.id} style={{ width: 220 }}>
                                <CarouselCard result={song} from={`?${from}=${id}`} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <Controls songs={suggestedSongs} page={{ from: from, id: id, youtube_link: props.match.params.id }} />
        </div>
    );
}