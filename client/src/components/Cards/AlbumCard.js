import React from 'react';
import './Cards.css';

export default function AlbumCard(props) {
    return (
        <div className="card">
            <img className='image' src={props.src} alt='' />
            <div className='title'>Album Title</div>
            <div className='artist_name'>Artist's Name</div>
        </div>
    );
}