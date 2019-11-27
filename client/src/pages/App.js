import React from 'react';

import { Provider } from "react-redux";
import store from "../redux/store";

import Theming from "./Theming";
import { saveState } from "../localStorage";

function App() {
    store.subscribe(() => {
        const currentState = store.getState();
        console.log(currentState);
        saveState(currentState);
    });

    return (
        <Provider store={store}>
            <Theming />
        </Provider>
    );
}

export default App;
