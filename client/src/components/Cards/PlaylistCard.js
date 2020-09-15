import React from 'react';
import './Cards.css';

export default function PlaylistCard(props) {
    return (
        <div className="card">
            <img className='image' src={props.src} alt='' />
            <div className='title'>Playlist's Title</div>
        </div>
    );
}