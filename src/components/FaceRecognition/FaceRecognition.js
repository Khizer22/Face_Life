import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL,boxes}) =>{

    const boxesArray = boxes.map((faceLocation,index)=>{
        return <div className='bounding-box' style={{top: faceLocation.topRow, right: faceLocation.rightCol, bottom: faceLocation.bottomRow, left: faceLocation.leftCol}}></div>
    });

    return (
        <div className='center ma'>
            <div className='relative mt2'>
                <img id='inputImage' alt='image to scan' src={imageURL} width='500px' height='auto'/>
               
                {boxesArray}
                
            </div>

            {/* Add more clariai text info here*/}
            {/* <div className=' mt2'>
                <div id='info-box' width='500px' height='500px'/>
            </div> */}

        </div>
    )
}

export default FaceRecognition;