import React from 'react';
import Wrapper from '../components/Wrapper';
import { Redirect, Route } from 'react-router-dom';
import Header from '../organisms/Header';
import HomePage from './HomePage';
import SettingsPage from './SettingsPage';
import AddProjectPage from './AddProjectPage';
import EditProjectsPage from './EditProjectsPage';
import CreateGrammarPage from './CreateGrammarPage';
import CreateMenuPage from './CreateMenuPage';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { saveState } from '../localStorage';

store.subscribe(() => {
    const currentState = store.getState();
    console.log(currentState);
    saveState(currentState);
});

function App() {
    return (
        <Provider store={store}>
            <Wrapper>
                <Header />
                <Redirect to="/" />
                <Route exact path="/" component={HomePage} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/addProject" component={AddProjectPage} />
                <Route path="/editProjects" component={EditProjectsPage} />
                <Route path="/createGrammar" component={CreateGrammarPage} />
                <Route path="/createMenu" component={CreateMenuPage} />
            </Wrapper>
        </Provider>
    );
}

export default App;
