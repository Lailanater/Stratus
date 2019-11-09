import {
    ADD_PROJECT,
    SET_CURRENT_PROJECT,
    SET_DEFAULT_ROUTE_TO,
    SET_MENU_NAME,
    SET_NEEDS_REPEAT,
    SET_NUM_OF_OPTIONS,
    TOGGLE_APP_MENU,
    TOGGLE_THEME
} from "../constants/actionTypes";

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

export function addProject(projectName, projectPath) {
    return {
        type: ADD_PROJECT,
        newProject: {
            name: projectName,
            path: projectPath
        }
    };
}

export function setNumOfOptions(numOfOptions) {
    return {
        type: SET_NUM_OF_OPTIONS,
        numOfOptions
    };
}

export function setMenuName(menuName) {
    return {
        type: SET_MENU_NAME,
        menuName
    };
}

export function setNeedsRepeat(needsRepeat) {
    return {
        type: SET_NEEDS_REPEAT,
        needsRepeat
    };
}

export function setDefaultRouteTo(defaultRouteTo) {
    return {
        type: SET_DEFAULT_ROUTE_TO,
        defaultRouteTo
    };
}