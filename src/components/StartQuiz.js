import React from 'react'
import blob1 from "../blob/yellow.svg"
import blob2 from "../blob/blue.svg"

export default function StartQuiz(props){
    return(
        
        <div className="start">
            <img id="blob1"className="blob"src={blob1} alt="yellow blob"/>
            <div id="text">
                <p>Quizzical</p>
                <button id="button" onClick={props.handleClick}>Start quiz</button>
            </div>
            <img id="blob2" className="blob" src={blob2} alt="blue blob"/>
        </div>
    )
}