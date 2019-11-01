import React from 'react';

import {Provider} from "react-redux";
import store from "../redux/store";

import HomePage from "./HomePage";
import Header from "../components/Header";

function App() {
    store.subscribe(() => console.log(store.getState()));

    return (
        <Provider store={store}>
            <Header/>
            <HomePage/>
        </Provider>
    );
}

export default App;
