import {TOGGLE_APP_MENU, TOGGLE_THEME, SET_CURRENT_PROJECT} from "../constants/actionTypes";

export function toggleAppMenu() {
    return {
        type: TOGGLE_APP_MENU
    };
}

export function toggleTheme() {
    return {
        type: TOGGLE_THEME
    };
}

export function setCurrentProject(nextProject) {
    return {
        type: SET_CURRENT_PROJECT,
        nextProject
    };
}