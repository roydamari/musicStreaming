import React from 'react';
import { BiSkipPrevious, BiPlayCircle, BiSkipNext } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import './Controls.css'

export default function Controls() {

    const liked = true;

    return (
        <div className='footer'>
            <div className='details'>
                <img className='song_image' src='https://images.squarespace-cdn.com/content/56454c01e4b0177ad4141742/1458827329966-I6OAVNU68IOF0A4IHQVY/Im-Gonna-Be-500-Miles-Cover.jpg?content-type=image%2Fjpeg' />
                <div>
                    <div className='song_title'>Song Title</div>
                    <div className='name_artist'>Artist's name</div>
                    <div className='heart'>
                        {liked ? <AiOutlineHeart size='24px' /> : <AiFillHeart size='24px' />}
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '-280px' }}>
                <div className='controls'>
                    <div className='icon'>
                        <BiSkipPrevious size='32px' />
                    </div>
                    <div className='icon'>
                        <BiPlayCircle size='32px' />
                    </div>
                    <div className='icon'>
                        <BiSkipNext size='32px' />
                    </div>
                </div>
                <input type="range" min="0" max="100" defaultValue='0' className="song_track" id="myRange" />
            </div>
            <div />
        </div>
    );
}