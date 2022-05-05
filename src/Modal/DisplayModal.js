import React from 'react'
import ToggleButton from '../ToggleButton';
import { toggleDarkTheme } from '../DisplaySettingsController'


const DisplayModal = ({ showDisplayModal, setshowDisplayModal }) => {
    const closeDisplayModal = () => {
        setshowDisplayModal(false);
    }
    return (
        <div className={`modal-container ${showDisplayModal && "is-open"}`}>
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
                <div className="setting">
                    <h3>Dark Theme</h3>
                    <ToggleButton toggleFunc={toggleDarkTheme}/>
                </div>
            </div>
        </div>
    );
}

export default DisplayModal;