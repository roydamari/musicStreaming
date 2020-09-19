import React, { useEffect, useRef, useState } from 'react';
import { BiSkipPrevious, BiPlayCircle, BiSkipNext, BiPauseCircle, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import './Controls.css'

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
                <img className='song_image' src={`https://img.youtube.com/vi/${props.currentSong && props.currentSong.youtube_link}/hqdefault.jpg`}
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
                        <div className='icon'>
                            <BiSkipPrevious size='32px' onClick={props.playPrev} />
                        </div>
                    </div>
                    <div className='icon'>
                        {playing ? <BiPauseCircle size='32px' onClick={PlayPause} /> : <BiPlayCircle size='32px' onClick={PlayPause} />}
                    </div>
                    <div className='icon'>
                        <BiSkipNext size='32px' onClick={props.skipSong} />
                    </div>
                </div>
                <span>{toMinutes(Math.round(currentTime))}</span>
                <input ref={rangeRef} type="range" min="0" max={duration} defaultValue='0' className="song_track" onMouseUp={moveVideo} />
                <span>{toMinutes(Math.round(duration - currentTime))}</span>
            </div>
            <div className='volume_div'>
                <div className='volume_wrap'>
                    {props.player ? props.player.getVolume() ?
                        <BiVolumeFull size='24px' cursor='pointer' onClick={() => {
                            props.player.setVolume(0)
                            volumeRef.current.value = 0;
                        }} /> :
                        <BiVolumeMute size='24px' cursor='pointer' onClick={() => {
                            props.player.setVolume(100)
                            volumeRef.current.value = 100;
                        }} /> :
                        <BiVolumeFull size='24px' />}
                    <input ref={volumeRef} type="range" min="0" max='100' defaultValue='100' className="volume_level" onChange={changeVolume} />
                </div>
            </div>
        </div>
    );
}