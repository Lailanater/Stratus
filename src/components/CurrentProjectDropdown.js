import React from 'react';
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { setCurrentProject } from "../redux/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";

const CurrentProjectDropdown = (props) => {
    const currentProject = useSelector(state => state.currentProject);
    const dispatch = useDispatch();

    function handleOnChange(e) {
        dispatch(setCurrentProject(e.target.value));
    }

    return (
        <div>
            <h2>Current project</h2>
            <InputLabel>Current Project</InputLabel>
            <Select value={currentProject} onChange={handleOnChange}>
                <MenuItem value={"ScrumF_TestApplication"}>ScrumF_TestApplication</MenuItem>
                <MenuItem value={"ALR_Inforce"}>ALR_Inforce</MenuItem>
            </Select>
        </div>
    );
};

export default CurrentProjectDropdown;