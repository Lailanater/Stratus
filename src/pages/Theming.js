import React from 'react';

import { ThemeProvider } from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from '@material-ui/core/CssBaseline';

import { useSelector } from "react-redux";

import Header from "../components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import AddProjectPage from "./AddProjectPage";
import CreateGrammarPage from "./CreateGrammarPage";
import CreateMenuPage from "./CreateMenuPage";
import { SnackbarProvider } from "notistack";

const Theming = (props) => {

    const theme = useSelector(state => state.theme);

    let currentTheme = createMuiTheme({
        palette: {
            type: theme,
            primary: {main: '#00838F'},
            secondary: {main: '#ed407a'}
        }
    });

    return (
        <ThemeProvider theme={currentTheme}>
            <SnackbarProvider maxSnack={2}>
                <CssBaseline/>
                <BrowserRouter>
                    <Header/>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/settings" component={SettingsPage}/>
                    <Route path="/addProject" component={AddProjectPage}/>
                    <Route path="/createGrammar" component={CreateGrammarPage}/>
                    <Route path="/createMenu" component={CreateMenuPage}/>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default Theming;