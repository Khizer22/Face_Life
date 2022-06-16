import React from 'react';
import './header.css';
import l_img from './l-logo_edit.png';
import g_img from './g-logo_edit.png';
import p_img from './p-logo.png';

const Header = () =>{

    
    return (
        <div className='header-css'>
            <p>Created by Khizer Mahboob</p>

            <a href='https://github.com/khizer22' target="_blank" className='small-text'><img id='l-logo' alt='linkedin logo' src={g_img} width='20px'/></a>
            <a href='https://ca.linkedin.com/in/khizermahboob' target="_blank" className='small-text'><img id='l-logo' alt='linkedin logo' src={l_img} width='20px'/></a>
            {/* <a href='https://khizer22.github.io/portfolio' target="_blank" className='small-text'><span className='portfolio-text'><span id='portfolio-p'>P</span><span id='v-s-text'>ortfolio</span></span></a> */}
            <a href='https://khizer22.github.io/portfolio' target="_blank" className='small-text'><span className='portfolio-text'><span id='portfolio-p'>P</span></span></a>

        </div>
    )
}

export default Header;