import React, {useState} from 'react'
import RulesModal from './Modal/RulesModal';
import DisplayModal from './Modal/DisplayModal';
import OnlineGameModal from './Modal/OnlineGameModal';

const Toolbar = () => {
    const [showDisplayModal, setShowDisplayModal] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [showOnlineGameModal, setShowOnlineGameModal] = useState(false);

    const revealModal = (setShowFunc) => {
        setShowFunc(true);
    }
    
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
                        onClick={() => revealModal(setShowRulesModal)}
                        >
                            <h3>Rules</h3> 
                        </div>
                        <div 
                        className='toolbar-setting'
                        onClick={() => revealModal(setShowDisplayModal)}
                        >
                            <h3>Display</h3> 
                        </div>
                        <div 
                        className='toolbar-setting'
                        onClick={() => revealModal(setShowOnlineGameModal)}
                        >
                            <h3>Host/Join game</h3> 
                        </div>
                    </div>
                </div>
            </div>
            <DisplayModal 
            setShowDisplayModal={setShowDisplayModal} 
            showDisplayModal={showDisplayModal}
            />
            <RulesModal 
            setShowRulesModal={setShowRulesModal} 
            showRulesModal={showRulesModal}
            />
            <OnlineGameModal 
            setShowOnlineGameModal={setShowOnlineGameModal} 
            showOnlineGameModal={showOnlineGameModal}
            />
        </>
    );
};

export default Toolbar;