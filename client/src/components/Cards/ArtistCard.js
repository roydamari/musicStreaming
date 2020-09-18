import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

export default function ArtistCard(props) {

    return (
        <Link to={`/artist/${props.artist.id}`} style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={props.artist.cover_img} alt='' />
                <div className='title'>{props.artist.name}</div>
            </div>
        </Link>
    );
}