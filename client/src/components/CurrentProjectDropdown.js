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
    const selectedProject = getProjectObjByName(e.target.value);
    dispatch(setCurrentProject(selectedProject));
  }

  function getProjectObjByName(projectName) {
    return projects.find(project => projectName === project.name);
  }

  function projectDoesExist() {
    return (
      projects.find(project => project.name === currentProject.name) !==
      undefined
    );
  }

  if ((projects.length === 0 && currentProject !== '') || !projectDoesExist()) {
    dispatch(setCurrentProject(''));
  }

  return (
    <Paper className="container" elevation={5}>
      <InputLabel>Current Project</InputLabel>
      <Select value={currentProject.name} onChange={handleOnChange}>
        {projects.map(project => (
          <MenuItem key={project.name} value={project.name}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
    </Paper>
  );
};

export default CurrentProjectDropdown;
