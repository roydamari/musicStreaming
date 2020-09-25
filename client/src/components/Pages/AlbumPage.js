import React, { useState, useEffect } from 'react';
import './Pages.css';
import CarouselCard from '../Cards/CarouselCard';
import Slider from "react-slick";
import axios from 'axios'
import Controls from '../Controls/Controls';
import NavBar from '../NavBar/NavBar';

export default function AlbumPage(props) {

    const [albumSongs, setSongs] = useState([]);
    const [currentAlbum, setAlbum] = useState()

    useEffect(() => {
        (async function fetchData() {
            let album = await axios.get(`/albums/${props.match.params.id}`);
            setAlbum(album.data);
            let songs = await axios.get(`/albums/${props.match.params.id}/songs`);
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
            <NavBar />
            <div>
                <h1>{currentAlbum && currentAlbum.name}</h1>
                <h3>{currentAlbum && currentAlbum.artist.name}</h3>
                <img className='album_cover'
                    src={currentAlbum && currentAlbum.coverImg}
                    alt=''
                />
            </div>
            <div style={{ margin: 'auto', width: '1760px' }}>
                <Slider {...settings}>
                    {albumSongs.map(song => {
                        return (
                            <div key={song.id} style={{ width: 220 }}>
                                <CarouselCard result={song} from={`?albums=${props.match.params.id}`} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <Controls songs={albumSongs} />
        </div>
    );
}