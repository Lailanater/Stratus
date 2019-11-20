import React from 'react';
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { setCurrentProject } from "../redux/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";

const CurrentProjectDropdown = (props) => {
    const currentProject = useSelector(state => state.currentProject);
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    function handleOnChange(e) {
        dispatch(setCurrentProject(e.target.value));
    }

    return (
        <div>
            <h2>Current project</h2>
            <InputLabel>Current Project</InputLabel>
            <Select value={currentProject} onChange={handleOnChange}>
                {projects.map(project =>
                    <MenuItem key={project.name.toString()} value={project}>{project.name}</MenuItem>
                )}
            </Select>
        </div>
    );
};

export default CurrentProjectDropdown;