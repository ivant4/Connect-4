import React from 'react'
import { toggleDarkTheme } from '../DisplaySettingsController'
import CloseButton from '../Button/CloseButton';
import ToggleButton from '../Button/ToggleButton';

const DisplayModal = ({ showDisplayModal, setShowDisplayModal }) => {
    return (
        <div className={`modal-container ${showDisplayModal && "is-open"}`}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2 className='modal-heading'>
                        Display Settings
                    </h2>
                    <CloseButton setShowFunc={setShowDisplayModal}/>
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