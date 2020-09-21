import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchCard(props) {

    let link = '';
    let src = ''
    let text = ''

    function typeOfResult(obj) {
        if (obj.hasOwnProperty('title')) return 'song';
        if (obj.hasOwnProperty('artist_id')) return 'album';
        if (obj.hasOwnProperty('upload_at')) return 'playlist';
        return 'artist';
    }

    switch (typeOfResult(props.result)) {
        case 'song':
            link = `/song/${props.result.youtube_link}?artist=${props.result.artist_id}`;
            src = `https://img.youtube.com/vi/${props.result.youtube_link}/hqdefault.jpg`
            text = <div>
                <h1>{props.result.title}</h1>
                <h3>{props.result.album_name}</h3>
                <h3>{props.result.artist_name}</h3>
            </div>;
            break;
        case 'album':
            link = `/album/${props.result.id}`;
            src = props.result.cover_img;
            text = <div>
                <h1>{props.result.name}</h1>
                <h3>{props.result.artist_name}</h3>
            </div>
            break;
        case 'artist':
            link = `/artist/${props.result.id}`;
            src = props.result.cover_img;
            text = <div>
                <h1>{props.result.name}</h1>
            </div>
            break;
        case 'playlist':
            link = `/playlist/${props.result.id}`;
            src = props.result.cover_img;
            text = <div>
                <h1>{props.result.name}</h1>
            </div>
            break;
        default:
            break;
    }

    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <div className='search_card'>
                <img src={src}
                    alt=''
                    height='250px'
                    width='250px' />
                {text}
            </div>
        </Link>
    );
}