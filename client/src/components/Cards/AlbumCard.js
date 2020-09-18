import React, { useEffect, useState } from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function AlbumCard(props) {

    return (
        <Link to={`/album/${props.album.id}`} style={{ textDecoration: 'none' }}>
            <div className="card">
                <img className='image' src={props.album.cover_img} alt='' />
                <div className='title'>{props.album.name}</div>
                <div className='artist_name'>{props.album.artist_name}</div>
            </div>
        </Link>
    );
}