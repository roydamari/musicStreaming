import React from 'react';
import './Cards.css';

export default function SongCard(props) {
    return (
        <div className="card">
            <img className='image' src={props.src} alt='' />
            <div className='title'>Song Title</div>
            <div className='artist_name'>Artist's Name</div>
        </div>
    );
}