import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

export default function SongCard(props) {
    return (
        <Link to='/song' style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={props.src} alt='' />
                <div className='title'>Song Title</div>
                <div className='artist_name'>Artist's Name</div>
            </div>
        </Link>
    );
}