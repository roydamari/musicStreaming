import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

export default function PlaylistCard(props) {

    return (
        <Link to={`/playlist/${props.playlist.id}`} style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={props.playlist.cover_img} alt='' />
                <div className='title'>{props.playlist.name}</div>
            </div>
        </Link >
    );
}