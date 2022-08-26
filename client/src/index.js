import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {GameContextProvider} from './GameContext';
import {OnlineGameContextProvider} from './OnlineGameContext';

ReactDOM.render(
  <React.StrictMode>
    <GameContextProvider>
      <OnlineGameContextProvider>
        <App/>
      </OnlineGameContextProvider>
    </GameContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);