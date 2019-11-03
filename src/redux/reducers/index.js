import {SET_CURRENT_PROJECT, TOGGLE_APP_MENU, TOGGLE_THEME} from "../constants/actionTypes";
import {initialState} from "../store";

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_APP_MENU:
            return Object.assign({}, state, {
                isAppMenuDisplayed: !state.isAppMenuDisplayed
            });
        case TOGGLE_THEME:
            let choice = "";
            if (state.theme === "dark") {
                choice = "light";
            } else {
                choice = "dark";
            }
            return Object.assign({}, state, {
                theme: choice
            });
        case SET_CURRENT_PROJECT:
            return Object.assign({}, state, {
                currentProject: action.nextProject
            });
        default:
            return state;
    }
}

export default rootReducer;