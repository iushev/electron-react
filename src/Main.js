import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import App from './views/App';
import store from './store';
import AppProvider from './AppContext';

const Main = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <App />
                    </MuiPickersUtilsProvider>
                </AppProvider>
            </Router>
        </Provider>
    );
};

export default Main;
