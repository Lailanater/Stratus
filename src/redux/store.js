import {createStore} from "redux";
import rootReducer from "./reducers";

export const initialState = {
    isAppMenuDisplayed: false,
    theme: "dark"
};

export default createStore(rootReducer);