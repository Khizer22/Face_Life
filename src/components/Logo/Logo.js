import React from 'react';
import Tilt from 'react-parallax-tilt';
import face from './face.png';
import './Logo.css';

const Logo = () =>{
    const [scale] = React.useState(1.1);

    return (
        <div className='center ma4 mt0'>
            <Tilt scale={scale} className='tiltBox br2 shadow-2'>
                <div id='tilt' className='pa3'>
                    <img alt='face logo' src={face} style={{paddingTop:'5px'}}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;