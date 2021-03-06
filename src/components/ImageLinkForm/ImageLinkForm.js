import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange , onDetectURL,onFileUpload,onFileChange, generalInfoText}) =>{

    let infoText = ``;
    if (generalInfoText === 'LOADING...')
        infoText = generalInfoText;
    else
        if (generalInfoText.length > 0 ){
            infoText = 'ATTRIBUTES: \n'
            generalInfoText.forEach((element,index) => {

                let ending = ',';

                if (index === generalInfoText.length - 1){
                    ending = '.'
                }

                infoText += ` ${element.name}${ending}`;
            });
        }

    return (
        <div>
            <p className='center-text f3'>{infoText.length > 0 ? infoText : `Copy and paste an image url below!`}</p>            
        
        <div className='center'>
            <div className='center form pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}  />

                <label htmlFor="urlSelect" className='w-20 grow f5 link ph1 pv2 white bg-light-purple'>Detect URL</label>
                <button id='urlSelect' onClick={onDetectURL} style={{display:"none"}}>Detect URL</button>

                <input type='file' id='fileSelect' accept="image/png, image/gif, image/jpeg" style={{display:"none"}} onChange={onFileChange}/>
                <label htmlFor="fileSelect" className='w-20 grow f5 link ph1 pv2 white bg-light-purple'>Upload File</label>
                {/* <button onClick={onFileUpload} className='w-20 grow f5 link ph1 pv2 dib white bg-light-purple'>UPLOAD</button> */}
            </div>
        </div>
        
        </div>
    )
}

export default ImageLinkForm;