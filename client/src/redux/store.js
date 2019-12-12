import { createStore } from 'redux';
import rootReducer from './reducers';
import { loadState } from '../localStorage';

let initialState = loadState();

if (initialState === undefined) {
    initialState = {
        isAppMenuDisplayed: false,
        theme: 'dark',
        currentProject: '',
        projects: [],
        menuName: '',
        needsRepeat: false,
        dtmfOptions: [],
        defaultRouteTo: 'menu'
    };
}

export default createStore(rootReducer, initialState);
