import React from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { setCurrentProject } from '../redux/actions/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const CurrentProjectDropdown = props => {
    const currentProject = useSelector(state => state.currentProject);
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    function handleOnChange(e) {
        dispatch(setCurrentProject(e.target.value));
    }

    return (
        <Paper className="container" elevation={5}>
            <InputLabel>Current Project</InputLabel>
            <Select value={currentProject} onChange={handleOnChange}>
                {projects.map(project => (
                    <MenuItem key={project.name.toString()} value={project}>
                        {project.name}
                    </MenuItem>
                ))}
            </Select>
        </Paper>
    );
};

export default CurrentProjectDropdown;
