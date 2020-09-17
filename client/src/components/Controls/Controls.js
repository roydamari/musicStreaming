import React, { useEffect, useRef, useState } from 'react';
import { BiSkipPrevious, BiPlayCircle, BiSkipNext, BiPauseCircle, BiVolumeFull } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import './Controls.css'
import { Link } from 'react-router-dom';

export default function Controls(props) {

    let duration = props.player ? props.player.getDuration() : '';
    const [currentTime, setCurrentTime] = useState();
    const [playing, setPlaying] = useState(props.playing);
    const [liked, setLiked] = useState(false);
    const rangeRef = useRef();
    const volumeRef = useRef();


    useEffect(() => {
        if (props.player) {
            setInterval(() => {
                setCurrentTime(props.player.getCurrentTime())
                if (rangeRef.current) {
                    rangeRef.current.value = props.player.getCurrentTime();
                }
            }, 1000);
        }
    }, [props.player])

    function PlayPause() {
        setPlaying(prevState => !prevState);
        props.onPlay(playing);
    }

    function toMinutes(duration) {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(((duration / 60) - minutes) * 60);
        if (isNaN(minutes)) return '0:00'
        return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
    }

    function moveVideo(e) {
        props.player.seekTo(e.currentTarget.value);
        props.player.playVideo();
        setPlaying(true);
    }

    function changeVolume(e) {
        props.player.setVolume(e.currentTarget.value);
    }

    function toggleLike() {
        setLiked(prevValue => !prevValue);
    }

    return (
        <div className='footer'>
            <div className='details'>
                <img className='song_image' src='https://images.squarespace-cdn.com/content/56454c01e4b0177ad4141742/1458827329966-I6OAVNU68IOF0A4IHQVY/Im-Gonna-Be-500-Miles-Cover.jpg?content-type=image%2Fjpeg'
                    alt=''
                />
                <div>
                    <div className='song_title'>{props.currentSong && props.currentSong.title}</div>
                    <div className='name_artist'>{props.currentSong && props.currentSong.artist_name}</div>
                    <div className='heart' onClick={toggleLike}>
                        {liked ? <AiOutlineHeart size='24px' /> : <AiFillHeart size='24px' />}
                    </div>
                </div>
            </div>
            <div className='play_range'>
                <div className='controls'>
                    <div className='icon'>
                        <Link to={`/song/${props.prevSong}`} style={{ color: '#b3b3b3' }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = e.currentTarget.style.color === 'white' ? '#b3b3b3' : 'white'
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = e.currentTarget.style.color === 'white' ? '#b3b3b3' : 'white'
                            }}>
                            <BiSkipPrevious size='32px' />
                        </Link>
                    </div>
                    <div className='icon'>
                        {playing ? <BiPauseCircle size='32px' onClick={PlayPause} /> : <BiPlayCircle size='32px' onClick={PlayPause} />}
                    </div>
                    <div className='icon'>
                        <Link to={`/song/${props.nextSong}`} style={{ color: '#b3b3b3' }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = e.currentTarget.style.color === 'white' ? '#b3b3b3' : 'white'
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = e.currentTarget.style.color === 'white' ? '#b3b3b3' : 'white'
                            }}>
                            <BiSkipNext size='32px' />
                        </Link>
                    </div>
                </div>
                <span>{toMinutes(Math.round(currentTime))}</span>
                <input ref={rangeRef} type="range" min="0" max={duration} defaultValue='0' className="song_track" onMouseUp={moveVideo} />
                <span>{toMinutes(Math.round(duration - currentTime))}</span>
            </div>
            <div className='volume_div'>
                <div className='volume_wrap'>
                    <BiVolumeFull size='24px' />
                    <input ref={volumeRef} type="range" min="0" max='100' defaultValue='100' className="volume_level" onChange={changeVolume} />
                </div>
            </div>
        </div>
    );
}