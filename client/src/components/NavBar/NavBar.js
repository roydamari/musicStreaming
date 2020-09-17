import React, { useRef } from 'react';
import './NavBar.css'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom';

export default function NavBar() {

    const searchRef = useRef();

    function toggleSearch() {
        searchRef.current.value = '';
        searchRef.current.style.visibility = searchRef.current.style.visibility === 'visible' ? 'hidden' : 'visible';
        searchRef.current.style.width = searchRef.current.style.width === '200px' ? '0px' : '200px';
    }

    return (
        <div className='nav_bar'>
            <Link to='/'>
                <BiArrowBack size='28px' className='nav_icon' />
            </Link>
            <Link to='/'>
                <AiFillHome size='28px' className='nav_icon' />
            </Link>
            <Link to='/'>
                <FaUser size='28px' className='nav_icon' />
            </Link>
            <AiOutlineSearch size='28px' className='nav_icon' onClick={toggleSearch} />
            <input ref={searchRef} type='text' className='search_box'></input>
        </div>
    );
}