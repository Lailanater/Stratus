import React, {Component} from 'react';

import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from '@material-ui/core/CssBaseline';

import {connect} from "react-redux";

import Header from "../components/Header";
import CurrentPage from "./CurrentPage";

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
                <CssBaseline />
                <Header/>
                <CurrentPage />
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps)(Theming);