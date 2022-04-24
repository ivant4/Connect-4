import React, {useState} from 'react'

const Toolbar = () => {
    const [showDisplayModal, setshowDisplayModal] = useState(false);
    
    const revealDisplayModal = () => {
        console.log("this works!!!");
    };
    const revealRulesModal = () => {
        console.log("this works!!!");
    };
    return (
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
    );
};

export default Toolbar;