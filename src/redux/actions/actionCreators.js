import {SET_CURRENT_PAGE, TOGGLE_APP_MENU, TOGGLE_THEME, SET_CURRENT_PROJECT} from "../constants/actionTypes";

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

export function setCurrentPage(nextPage) {
    return {
        type: SET_CURRENT_PAGE,
        nextPage
    };
}

export function setCurrentProject(nextProject) {
    return {
        type: SET_CURRENT_PROJECT,
        nextProject
    };
}