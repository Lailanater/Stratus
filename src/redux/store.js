import { createStore } from "redux";
import rootReducer from "./reducers";

export const initialState = {
    isAppMenuDisplayed: false,
    theme: "dark",
    currentProject: "",
    projects: [],
    menuName: "",
    needsRepeat: false,
    dtmfOptions: [],
    defaultRouteTo: "menu"
};

export default createStore(rootReducer);