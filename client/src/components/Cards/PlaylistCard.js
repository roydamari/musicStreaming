import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

export default function PlaylistCard(props) {
    return (
        <Link to='/playlist' style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={props.src} alt='' />
                <div className='title'>Playlist's Title</div>
            </div>
        </Link >
    );
}