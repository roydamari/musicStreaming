import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

export default function CarouselCard(props) {

    let link = '';
    let display = ''

    function typeOfResult(obj) {
        if (obj.hasOwnProperty('title')) return 'song';
        if (obj.hasOwnProperty('artist_id')) return 'album';
        if (obj.hasOwnProperty('upload_at')) return 'playlist';
        return 'artist';
    }

    switch (typeOfResult(props.result)) {
        case 'song':
            link = props.from ? `/song/${props.result.youtube_link}${props.from}` : `/song/${props.result.youtube_link}?artist=${props.result.artist_id}`;
            display = <div className="card">
                <img className='image' src={`https://img.youtube.com/vi/${props.result.youtube_link}/hqdefault.jpg`} alt='' />
                <div className='title'>{props.result.title}</div>
                <div className='artist_name'>{props.result.artist_name}</div>
            </div>;
            break;
        case 'album':
            link = `/album/${props.result.id}`;
            display = <div className="card">
                <img className='image' src={props.result.cover_img} alt='' />
                <div className='title'>{props.result.name}</div>
                <div className='artist_name'>{props.result.artist_name}</div>
            </div>;
            break;
        case 'artist':
            link = `/artist/${props.result.id}`;
            display = <div className="card">
                <img className='image' src={props.result.cover_img} alt='' />
                <div className='title'>{props.result.name}</div>
            </div>;
            break;
        case 'playlist':
            link = `/playlist/${props.result.id}`;
            display = <div className="card">
                <img className='image' src={props.result.cover_img} alt='' />
                <div className='title'>{props.result.name}</div>
            </div>;
            break;
        default:
            break;
    }

    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            {display}
        </Link>
    );
}