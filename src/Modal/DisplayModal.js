import React from 'react'

const DisplayModal = ({setshowDisplayModal}) => {
    // make a toggle button and add dark theme option 
    const closeDisplayModal = () => {
        setshowDisplayModal(false);
    }
    return (
        <div className="modal-container is-open">
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-heading'>
                        Display Settings
                    </h2>
                    <button 
                    className='btn exit-btn' 
                    onClick={closeDisplayModal}
                    >
                        x
                    </button>
                </div>
                <div className="display setting">
                    <h3>Dark Theme</h3>
                </div>
            </div>
        </div>
    );
}

export default DisplayModal;