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
        <div className='toolbar'>
            <div className='toolbar-title'>
                <h2>Connect 4</h2>
            </div>
            <div className='toolbar-settings'>
                <h3 
                className='toolbar-setting' 
                onClick={revealDisplayModal}
                >
                        Rules
                </h3>
                <h3 
                className='toolbar-setting'
                onClick={revealRulesModal}
                >
                    Display
                </h3>
            </div>
        </div>
        
    );
};

export default Toolbar;