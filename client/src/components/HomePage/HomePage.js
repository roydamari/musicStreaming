import React, { useEffect, useState } from 'react';
import SongCard from '../Cards/SongCard';
import AlbumCard from '../Cards/AlbumCard';
import ArtistCard from '../Cards/ArtistCard';
import PlaylistCard from '../Cards/PlaylistCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import Controls from '../Controls/Controls';

export default function HomePage() {
    const [topSongs, setSongs] = useState([]);
    const [topAlbums, setAlbums] = useState([]);
    const [topArtists, setArtists] = useState([]);
    const [topPlaylists, setPlaylists] = useState([]);

    useEffect(() => {
        (async function fetchData() {
            let songs = await axios.get('/topSongs');
            setSongs(songs.data);
            let albums = await axios.get('/topAlbums');
            setAlbums(albums.data);
            let artists = await axios.get('/topArtists');
            setArtists(artists.data);
            let playlists = await axios.get('/topPlaylists');
            setPlaylists(playlists.data);
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
        <div style={{ margin: 'auto', width: '1760px' }}>
            <h1>Top Songs</h1>
            <Slider {...settings}>
                {topSongs.map(song => {
                    return (
                        <div key={song.id} style={{ width: 220 }}>
                            <SongCard src='https://images.squarespace-cdn.com/content/56454c01e4b0177ad4141742/1458827329966-I6OAVNU68IOF0A4IHQVY/Im-Gonna-Be-500-Miles-Cover.jpg?content-type=image%2Fjpeg' song={song} />
                        </div>
                    );
                })}
            </Slider>
            <h1>Top Albums</h1>
            <Slider {...settings}>
                {topAlbums.map((album, i) => {
                    return (
                        <div key={i} style={{ width: 220 }}>
                            <AlbumCard src='https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg' album={album} />
                        </div>
                    );
                })}
            </Slider>
            <h1>Top Artists</h1>
            <Slider {...settings}>
                {topArtists.map((artist, i) => {
                    return (
                        <div key={i} style={{ width: 220 }}>
                            <ArtistCard src='https://content.api.news/v3/images/bin/ba49fee5bc802f0a32a9415fef635f71' artist={artist} />
                        </div>
                    );
                })}
            </Slider>
            <h1>Top Playlists</h1>
            <Slider {...settings}>
                {topPlaylists.map((playlist, i) => {
                    return (
                        <div key={i} style={{ width: 220 }}>
                            <PlaylistCard src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsn322z_Dw58yJfDO_1OpN5Uf32nBpy-lKrg&usqp=CAU' playlist={playlist} />
                        </div>
                    );
                })}
            </Slider>
            <Controls />
        </div>
    );
}