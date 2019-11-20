import React from 'react';
import { FormControlLabel, Paper, Switch } from "@material-ui/core";
import { toggleTheme } from "../redux/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";

const SettingsPage = (props) => {
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    return (
        <div className="container">
            <Paper className="container">
            <FormControlLabel
                control={<Switch checked={theme === "dark"} onChange={() => dispatch(toggleTheme())} />}
                label="Dark Theme" />
            </Paper>
        </div>
    );
};

export default SettingsPage;