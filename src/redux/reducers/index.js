import {TOGGLE_APP_MENU} from "../constants/actionTypes";

const initialState = {
    isAppMenuDisplayed: false
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_APP_MENU:
            return Object.assign({}, state, {
                isAppMenuDisplayed: !state.isAppMenuDisplayed
            })
        default:
            return state
    }
}

export default rootReducer;