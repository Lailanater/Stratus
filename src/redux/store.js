import {createStore} from "redux";
import rootReducer from "./reducers";

export const initialState = {
    isAppMenuDisplayed: false,
    theme: "dark",
    currentProject: "",
    projects: []
};

export default createStore(rootReducer);