import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

export default function SongCard(props) {

    const link = props.from ? `/song/${props.song.youtube_link}${props.from}` : `/song/${props.song.youtube_link}?artist=${props.song.artist_id}`;

    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={`https://img.youtube.com/vi/${props.song.youtube_link}/hqdefault.jpg`} alt='' />
                <div className='title'>{props.song.title}</div>
                <div className='artist_name'>{props.song.artist_name}</div>
            </div>
        </Link>
    );
}