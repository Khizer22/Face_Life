import React from 'react';
import Tilt from 'react-parallax-tilt';
import face from './face.png';
import logoImage from './logo4.png'
import './Logo.css';

const Logo = () =>{
    const [scale] = React.useState(1.1);

    return (
        <div className='center ma4 mt0'>
            <Tilt scale={scale} className='tiltBox '>
                <div id='tilt' className=''>
                    <img alt='face logo' src={logoImage} style={{paddingTop:'0px'}}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;