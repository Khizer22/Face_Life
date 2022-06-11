import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange , onPictureSubmit, generalInfoText}) =>{

    let infoText = ``;
    if (generalInfoText.length > 0 ){
        infoText = 'ATTRIBUTES: \n'
        generalInfoText.forEach(element => {
            infoText += ` ${element.name},`;
        });
    }

    return (
        <div>
            <p className='f3'>{infoText.length > 0 ? infoText : `Copy and paste an image url below!`}</p>            
        
        <div className='center'>
            <div className='center form pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}  />
                <button onClick={onPictureSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
            </div>
        </div>
        
        </div>
    )
}

export default ImageLinkForm;