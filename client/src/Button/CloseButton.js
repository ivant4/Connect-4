import React, { useState } from 'react'

const CloseButton = ({ setShowFunc }) => {
    const closeElement = () => {
        setShowFunc(false);
    }
    return (
        <button 
        className='btn close-btn' 
        onClick={closeElement}
        >
            x
        </button>
    );
}

export default CloseButton;