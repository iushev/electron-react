import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Main from './Main';
import 'typeface-roboto';
import 'flag-icon-css/css/flag-icon.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import registerServiceWorker from './registerServiceWorker';

import registerIpcListeners from './ipcRenderer';
registerIpcListeners();

// render application component
ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
