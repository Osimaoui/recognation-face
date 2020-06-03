import React from 'react';

const Rank = ({ name, entries, image}) => {

        if (image.length>0){
            return (
                <div> 
                    <div className="white f3 center">
                        {name.toUpperCase()}
                    </div>
                    <div className="white f3 center">
                        {`Your entries : ${entries}`}
                    </div>
                    <div className="white f3 center">
                        {`Face Detected: ${image.length}`}
                    </div>
                </div>
                
            )
        }else {
            return(
        <div> 
            <div className="white f3 center">
                {name.toUpperCase()}
            </div>
            <div className="white f3 center">
                {`Your entries : ${entries}`}
            </div>
        </div>
    )
        }

    
}

export default Rank;