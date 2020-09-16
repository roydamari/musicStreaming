import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

export default function ArtistCard(props) {
    return (
        <Link to='/artist' style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={props.src} alt='' />
                <div className='title'>Artist's Name</div>
            </div>
        </Link>
    );
}