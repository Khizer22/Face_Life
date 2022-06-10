import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL,box}) =>{

    return (
        <div className='center ma'>
            <div className='relative mt2'>
                <img id='inputImage' alt='image to scan' src={imageURL} width='500px' height='auto'/>
               
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                
            </div>

            {/* Add more clariai text info here*/}
            {/* <div className=' mt2'>
                <div id='info-box' width='500px' height='500px'/>
            </div> */}

        </div>
    )
}

export default FaceRecognition;