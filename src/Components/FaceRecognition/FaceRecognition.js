import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl,image }) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id= 'inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
                { image.map((val, index) =>{
                    return (<span key={index} className="boundingbox"
                    style={{
                        top: val.top,
                        right: val.right,
                        bottom: val.bottom,
                        left: val.left
                    }}
                ></span>)
                })
                  } 
            </div>
        </div>
    )
}

export default React.memo(FaceRecognition);