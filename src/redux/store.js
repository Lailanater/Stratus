import {createStore} from "redux";
import rootReducer from "./reducers";

import HomePage from "../containers/HomePage"
import React from "react";

export const initialState = {
    isAppMenuDisplayed: false,
    theme: "dark",
    currentPage: <HomePage />,
    currentProject: "ScrumF_TestApplication"
};

export default createStore(rootReducer);