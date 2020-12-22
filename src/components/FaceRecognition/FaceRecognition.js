import React from 'react';
import'./FaceRecognition.css';


const FaceRecognition =({input, faceDetect}) =>{
    return(
    <div className='center ma'>
        
        <div className='absolute mt2'>  
            <img  id='inputImage' alt='' src={input} width='500px' height='auto'/>
            <div className='bounding-box' style={{ top: faceDetect.topRow, right: faceDetect.rightCol, bottom: faceDetect.bottomRow, left: faceDetect.leftCol}}></div>
        </div>
        
        
    </div>
    )
    
}

export default FaceRecognition;