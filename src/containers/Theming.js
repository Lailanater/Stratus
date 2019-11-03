import React, {Component} from 'react';

import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from '@material-ui/core/CssBaseline';

import {connect} from "react-redux";

import Header from "../components/Header";
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import AddProjectPage from "./AddProjectPage";
import CreateMenuPage from "./CreateMenuPage";
import {SnackbarProvider} from "notistack";

const mapStateToProps = state => {
    return {
        theme: state.theme
    };
};

class Theming extends Component {
    render() {
        let theme = createMuiTheme({
            palette: {
                type: this.props.theme,
                primary: {main: '#00838F'},
                secondary: {main: '#ed407a'}
            }
        });

        console.log(theme);
        return (
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={2}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <Header/>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/settings" component={SettingsPage}/>
                        <Route path="/addProject" component={AddProjectPage}/>
                        <Route path="/createMenu" component={CreateMenuPage}/>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps)(Theming);