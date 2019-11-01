import {TOGGLE_APP_MENU, TOGGLE_THEME} from "../constants/actionTypes";

export function toggleAppMenu() {
    return {
        type: TOGGLE_APP_MENU
    }
}

export function toggleTheme() {
    return {
        type: TOGGLE_THEME
    }
}