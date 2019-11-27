import { createStore } from "redux";
import rootReducer from "./reducers";

const initialState = {
    isAppMenuDisplayed: false,
    theme: "dark",
    currentProject: "",
    projects: [],
    menuName: "",
    needsRepeat: false,
    dtmfOptions: [],
    defaultRouteTo: "menu"
};

export default createStore(rootReducer, initialState);