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
    needsDtmf: false,
    needsVoice: false,
    dtmfOptions: [],
    defaultRouteTo: 'menu',
    isNextButtonDisabled: false,
    isFinishButtonDisabled: false
  };
}

export default createStore(rootReducer, initialState);
