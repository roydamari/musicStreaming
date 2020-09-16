import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';


export default function AlbumCard(props) {
    return (
        <Link to='/album' style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={props.src} alt='' />
                <div className='title'>Album Title</div>
                <div className='artist_name'>Artist's Name</div>
            </div>
        </Link>
    );
}