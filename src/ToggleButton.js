import React, { useState } from 'react'

const ToggleButton = ({ toggleFunc }) => {
    // need to fix this !!!!
    // cannot remember the state of toggle button right now becuase a 
    // new instance of modal is rendered every time it is opened in the toolbar 
    const [isTurnedOn, setIsTurnedOn] = useState(false);
    const toggle = () => {
        // ensure that this only triggers rerendering once
        toggleFunc(!isTurnedOn);
        setIsTurnedOn(!isTurnedOn);
    }
    return (
        <div 
        className={`toggle-btn ${isTurnedOn && "on-toggle-btn"}`} 
        onClick={toggle}
        >
            <div className='toggle-knob'/>
        </div>
    );
}

export default ToggleButton;