import { createStore } from "redux";
import rootReducer from "./reducers";

export const initialState = {
    isAppMenuDisplayed: false,
    theme: "dark",
    currentProject: "",
    projects: [],
    menuName: "",
    numOfOptions: 0,
    needsRepeat: false,
    dtmfOptions: [],
    defaultRouteTo: "menu"
};

export default createStore(rootReducer);