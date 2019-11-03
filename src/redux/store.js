import {createStore} from "redux";
import rootReducer from "./reducers";

export const initialState = {
    isAppMenuDisplayed: false,
    theme: "dark",
    currentProject: "ScrumF_TestApplication"
};

export default createStore(rootReducer);