import React, { useEffect, useRef, useState } from 'react';
import { BiSkipPrevious, BiPlayCircle, BiSkipNext, BiPauseCircle, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import './Controls.css'
import YouTube from 'react-youtube';

export default function Controls(props) {

    const [player, setPlayer] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [playing, setPlaying] = useState(true);
    const [liked, setLiked] = useState(false);
    const rangeRef = useRef();
    const volumeRef = useRef();
    const [currentSong, setCurrent] = useState()
    const [nextSong, setNext] = useState();
    const [prevSong, setPrev] = useState();
    const { songs } = props;
    const [lastVolume, setLast] = useState(100);



    useEffect(() => {
        (async function fetchData() {
            if (props.page) {
                const current = songs.find(song => song.youtubeLink === props.page.youtubeLink);
                console.log(current);
                setCurrent(current);
                let next = songs[songs.indexOf(current) + 1];
                if (!next) {
                    next = songs[0]
                }
                setNext(next)
                let prev = songs[songs.indexOf(current) - 1]
                if (!prev) {
                    prev = songs[songs.length - 1]
                }
                setPrev(prev);
            } else {
                const current = songs[0];
                setCurrent(current);
                setNext(songs[1])
                setPrev(songs[songs.length - 1]);
            }
        })();
    }, [songs]);


    useEffect(() => {
        if (player) {
            setInterval(() => {
                setCurrentTime(player.getCurrentTime())
                if (rangeRef.current) {
                    rangeRef.current.value = player.getCurrentTime();
                }
            }, 1000);
        }
    }, [player])

    useEffect(() => {
        if (player) {
            setPlaying(player.getPlayerState() === 1 ? false : true)
        }
    }, [currentSong])

    function playNext() {
        if (props.page) {
            window.location.href = `/song/${nextSong.youtubeLink}?${props.page.from}=${props.page.id}`;
        }
        player.cueVideoById(nextSong.youtubeLink);
        player.playVideo();
        const next = songs.find((song, i) => songs.indexOf(nextSong) + 1 === i)
        setPrev(currentSong);
        if (next) {
            setCurrent(nextSong);
            setNext(next)
        } else {
            setCurrent(songs[0]);
            setNext(songs[1])
        }
    }

    function playPrev() {
        if (props.page) {
            window.location.href = `/song/${prevSong.youtubeLink}?${props.page.from}=${props.page.id}`;
        }
        player.cueVideoById(prevSong.youtubeLink);
        player.playVideo();
        const prev = songs.find((song, i) => songs.indexOf(prevSong) - 1 === i);
        setNext(currentSong);
        if (prev) {
            setCurrent(prevSong);
            setPrev(prev);
        } else {
            setCurrent(songs[songs.length - 1]);
            setPrev(songs[songs.length - 2])
        }
    }

    function PlayPause() {
        if (playing) {
            player.pauseVideo();
            setPlaying(prevState => !prevState);
        } else {
            player.playVideo();
            setPlaying(prevState => !prevState);
        }
    }

    function _onReady(event) {
        setPlayer(event.target);
    }

    let opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 1,
        },
    };


    function toMinutes(duration) {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(((duration / 60) - minutes) * 60);
        if (isNaN(minutes)) return '0:00'
        return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
    }

    function moveVideo(e) {
        player.seekTo(e.currentTarget.value);
        player.playVideo();
        setPlaying(true);
    }

    function changeVolume(e) {
        player.setVolume(e.currentTarget.value);
    }

    function toggleLike() {
        setLiked(prevValue => !prevValue);
    }

    return (
        <>
            <div className='footer'>
                <div className='details'>
                    <img className='song_image' src={`https://img.youtube.com/vi/${currentSong && currentSong.youtubeLink}/hqdefault.jpg`}
                        alt=''
                    />
                    <div>
                        <div className='song_title'>{currentSong && currentSong.title}</div>
                        <div className='name_artist'>{currentSong && currentSong.artist.name}</div>
                        <div className='heart' onClick={toggleLike}>
                            {liked ? <AiOutlineHeart size='24px' /> : <AiFillHeart size='24px' />}
                        </div>
                    </div>
                </div>
                <div className='play_range'>
                    <div className='controls'>
                        <div className='icon'>
                            <div className='icon'>
                                <BiSkipPrevious size='32px' onClick={playPrev} />
                            </div>
                        </div>
                        <div className='icon'>
                            {playing ? <BiPauseCircle size='32px' onClick={PlayPause} /> : <BiPlayCircle size='32px' onClick={PlayPause} />}
                        </div>
                        <div className='icon'>
                            <BiSkipNext size='32px' onClick={playNext} />
                        </div>
                    </div>
                    <span>{toMinutes(Math.round(currentTime))}</span>
                    <input ref={rangeRef} type="range" min="0" max={currentSong && currentSong.length} defaultValue='0' className="song_track" onMouseUp={moveVideo} />
                    <span>{toMinutes(Math.round(currentSong && currentSong.length - currentTime))}</span>
                </div>
                <div className='volume_div'>
                    <div className='volume_wrap'>
                        {player ? !player.isMuted() ?
                            <BiVolumeFull size='24px' cursor='pointer' onClick={() => {
                                setLast(player.getVolume());
                                player.mute();
                                volumeRef.current.value = 0;
                            }} /> :
                            <BiVolumeMute size='24px' cursor='pointer' onClick={() => {
                                player.unMute();
                                volumeRef.current.value = lastVolume;
                            }} /> :
                            <BiVolumeFull size='24px' />}
                        <input ref={volumeRef} type="range" min="0" max='100' defaultValue='100' className="volume_level" onChange={changeVolume} />
                    </div>
                </div>
            </div>
            <YouTube videoId={currentSong && currentSong.youtubeLink} opts={opts} onReady={_onReady} onEnd={playNext} />
        </>
    );
}