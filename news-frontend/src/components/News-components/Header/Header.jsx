import React from 'react';
import './styles.css'

const Header = () => {
    return (
        <div>
            <button className='sidebar-button'></button>
            <div className='search-block'><div className='search-img'></div><input placeholder='Поиск...' className='search-input' type="text" /><button className='join-button'>Войти</button></div>
            <hr className='header-hr'/>
            <div className='global-title'>The World News</div>
        </div>
    );
};

export default Header;