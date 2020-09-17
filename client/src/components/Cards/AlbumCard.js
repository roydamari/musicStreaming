import React, { useEffect, useState } from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function AlbumCard(props) {

    const [artist_name, setArtist_Name] = useState('');
    useEffect(() => {
        (async function fetchData() {
            let name = await axios.get(`/artist/${props.album.artist_id}`);
            setArtist_Name(name.data[0].name);
        })();
    }, []);

    return (
        <Link to='/album' style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={props.album.cover_img} alt='' />
                <div className='title'>{props.album.name}</div>
                <div className='artist_name'>{artist_name}</div>
            </div>
        </Link>
    );
}