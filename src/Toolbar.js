import React, {useState} from 'react'
import RulesModal from './Modal/RulesModal';
import DisplayModal from './Modal/DisplayModal';

const Toolbar = () => {
    const [showDisplayModal, setshowDisplayModal] = useState(false);
    const [showRulesModal, setshowRulesModal] = useState(false);
    
    const revealDisplayModal = () => {
        setshowDisplayModal(true);
    };
    const revealRulesModal = () => {
        setshowRulesModal(true);
    };
    return (
        <>
            <div className='toolbar-container'>
                <div className='toolbar'>
                    <div className='toolbar-title'>
                        <h2>Connect 4</h2>
                    </div>
                    <div className='toolbar-settings'>
                        <div 
                        className='toolbar-setting' 
                        onClick={revealRulesModal}
                        >
                            <h2>Rules</h2> 
                        </div>
                        <div 
                        className='toolbar-setting'
                        onClick={revealDisplayModal}
                        >
                            <h2>Display</h2> 
                        </div>
                    </div>
                </div>
            </div>
            {showDisplayModal && <DisplayModal setshowDisplayModal={setshowDisplayModal}/>}
            {showRulesModal && <RulesModal setshowRulesModal={setshowRulesModal}/>}
        </>
    );
};

export default Toolbar;