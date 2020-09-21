import React, { useEffect, useRef, useState } from 'react';
import './NavBar.css'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi'
import { Link, useHistory } from 'react-router-dom';

export default function NavBar() {

    const searchRef = useRef();
    let history = useHistory();

    useEffect(() => {
        if (window.location.href === 'http://localhost:3000/search') {
            searchRef.current.value = '';
            searchRef.current.style.visibility = 'visible';
            searchRef.current.style.width = '250px';
        }
    }, [window.location.href])

    function toggleSearch() {
        searchRef.current.value = '';
        searchRef.current.style.visibility = searchRef.current.style.visibility === 'visible' ? 'hidden' : 'visible';
        searchRef.current.style.width = searchRef.current.style.width === '250px' ? '0px' : '250px';
    }

    function searchSongs(e) {
        if (!e.currentTarget.value) {
            history.push('/search')
        } else {
            history.push({
                pathname: '/search',
                search: `params=${e.currentTarget.value}`
            })
        }
    }

    return (
        <div className='nav_bar'>
            <BiArrowBack size='28px' className='nav_icon' onClick={history.goBack} />
            <Link to='/'>
                <AiFillHome size='28px' className='nav_icon' />
            </Link>
            <Link to='/'>
                <FaUser size='28px' className='nav_icon' />
            </Link>
            <Link to='/search' >
                <AiOutlineSearch size='28px' className='nav_icon' onClick={toggleSearch} />
            </Link>
            <input ref={searchRef} type='text' className='search_box' onChange={searchSongs} placeholder='Search for Artists, Songs, or Playlists'></input>
        </div>
    );
}