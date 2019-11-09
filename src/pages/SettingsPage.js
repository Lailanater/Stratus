import React from 'react';
import { FormControlLabel, Paper, Switch } from "@material-ui/core";
import { toggleTheme } from "../redux/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";

const SettingsPage = (props) => {
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    return (
        <Paper>
            <FormControlLabel
                control={<Switch checked={theme === "dark"} onChange={() => dispatch(toggleTheme())} />}
                label="Dark Theme" />
        </Paper>
    );
};

export default SettingsPage;