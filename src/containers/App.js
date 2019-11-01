import React from 'react';

import {Provider} from "react-redux";
import store from "../redux/store";

import Theming from "../containers/Theming";

function App() {
    store.subscribe(() => console.log(store.getState()));

    return (
        <Provider store={store}>
            <Theming/>
        </Provider>
    );
}

export default App;
