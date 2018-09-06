import { createStore, applyMiddleware/*, compose */} from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from './reducers';
import { loadState, saveState } from './localStorage' ;

// import { composeWithDevTools } from 'redux-devtools-extension';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const persistedStore = loadState();
const store = createStore(rootReducer, persistedStore, composeWithDevTools(
    applyMiddleware(thunk)
));

store.subscribe(throttle(() => {
    const auth = store.getState().auth.auth;
    saveState({
        auth: {
            auth: auth.rememberMe ? auth : undefined,
        },
    });
}, 1000));

export default store;
