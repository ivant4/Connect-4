import React, { useState } from 'react'

const ToggleButton = ({ toggleFunc }) => {
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