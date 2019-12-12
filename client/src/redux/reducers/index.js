import {
    ADD_PROJECT,
    REMOVE_PROJECT,
    SET_CURRENT_PROJECT,
    SET_DEFAULT_ROUTE_TO,
    SET_DTMF_OPTIONS,
    SET_MENU_NAME,
    SET_NEEDS_REPEAT,
    TOGGLE_APP_MENU,
    TOGGLE_THEME
} from '../constants/actionTypes';
import { objectsAreEqual } from '../../utils/helpers';

function rootReducer(state, action) {
    switch (action.type) {
        case TOGGLE_APP_MENU:
            return Object.assign({}, state, {
                isAppMenuDisplayed: !state.isAppMenuDisplayed
            });
        case TOGGLE_THEME:
            let choice = '';
            if (state.theme === 'dark') {
                choice = 'light';
            } else {
                choice = 'dark';
            }
            return Object.assign({}, state, {
                theme: choice
            });
        case SET_CURRENT_PROJECT:
            return Object.assign({}, state, {
                currentProject: action.nextProject
            });
        case ADD_PROJECT:
            return Object.assign({}, state, {
                projects: state.projects.concat(action.newProject)
            });
        case SET_MENU_NAME:
            return Object.assign({}, state, {
                menuName: action.menuName
            });
        case SET_NEEDS_REPEAT:
            return Object.assign({}, state, {
                needsRepeat: action.needsRepeat
            });
        case SET_DTMF_OPTIONS:
            return Object.assign({}, state, {
                dtmfOptions: action.dtmfOptions
            });
        case SET_DEFAULT_ROUTE_TO:
            return Object.assign({}, state, {
                defaultRouteTo: action.defaultRouteTo
            });
        case REMOVE_PROJECT:
            const filteredProjects = state.projects.filter(project => {
                return !objectsAreEqual(project, action.projectToRemove);
            });

            return (state = { ...state, projects: filteredProjects });
        default:
            return state;
    }
}

export default rootReducer;
