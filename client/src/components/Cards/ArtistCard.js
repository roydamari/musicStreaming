import React from 'react';
import './Cards.css';

export default function ArtistCard(props) {
    return (
        <div className="card">
            <img className='image' src={props.src} alt='' />
            <div className='title'>Artist's Name</div>
        </div>
    );
}