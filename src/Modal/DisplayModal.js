import React from 'react'

const DisplayModal = ({setshowDisplayModal}) => {
    // make a toggle button and add dark theme option 
    const closeDisplayModal = () => {
        setshowDisplayModal(false);
    }
    return (
        <div className="modal-container is-open">

            <div className='modal-content'>
                <button 
                className='btn exit-btn' 
                onClick={closeDisplayModal}
                >
                    x
                </button>
                <h2>
                    Display Setting
                </h2>
            </div>
        </div>
    );
}

export default DisplayModal;