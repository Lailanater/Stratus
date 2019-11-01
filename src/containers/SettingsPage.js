import React, {Component} from 'react';
import {FormControlLabel, Switch} from "@material-ui/core";
import {toggleTheme} from "../redux/actions/actionCreators";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        theme: state.theme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTheme: () => {
            dispatch(toggleTheme());
        }
    };
};

class SettingsPage extends Component {
    render() {
        return (
            <FormControlLabel control={<Switch checked={this.props.theme === "dark"} onChange={this.props.toggleTheme}/>} label="Dark Theme"/>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);