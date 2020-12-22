import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './icons8-brain-100.png'

const Logo =() => {
    return (
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 125, width: 125 }} >
            <div className="Tilt-inner pa3"> 
                <img  style={{paddingTop: '3px'}} alt=" logo of brain" src={brain}/>
            </div>
        </Tilt>
    );
}

export default Logo