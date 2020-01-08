import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/actions/actionCreators';
import { Redirect } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { objectsAreEqual } from '../utils/helpers';
import styled from 'styled-components';
import isElectron from 'is-electron';

const PathTextInput = styled(TextField)`
  width: 500px;
`;

const NameTextInput = styled(TextField)`
  width: 350px;
`;

const AddProjectPage = props => {
  const [canRedirect, setCanRedirect] = useState(false);
  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();

  function setDefaultProjectName() {
    console.log(document.querySelector('#project-name-input').value);
    document.querySelector(
      '#project-name-input'
    ).value = getTextAfterLastSlash();
  }

  function replaceBacklashesWithForwardSlashes(path) {
    if (path.indexOf('/') === -1) {
      path = path.replace(/\\/g, '/');
    }
    return path;
  }

  function getTextAfterLastSlash() {
    let path = document.querySelector('#project-path-input').value;
    path = replaceBacklashesWithForwardSlashes(path);

    let slashIndex = path.lastIndexOf('/');

    return path.substr(slashIndex + 1, path.length);
  }

  function isValidPath(path) {
    if (!isElectron()) {
      return true; // Cannot validate the path. Assume given is valid.
    } else {
      const { remote } = window.require('electron');
      const fs = remote.require('fs');
      return fs.existsSync(path);
    }
  }

  function projectAlreadyExists(projectName, projectPath) {
    const projectToAdd = {
      name: projectName,
      path: projectPath
    };

    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];
      if (objectsAreEqual(project, projectToAdd)) {
        return true;
      }
    }
    return false;
  }

  function handleOnClick() {
    const projectName = document.querySelector('#project-name-input').value;
    const projectPath = document.querySelector('#project-path-input').value;

    if (projectName === '' || projectPath === '') {
      props.enqueueSnackbar('Please update both fields first', {
        variant: 'error',
        autoHideDuration: 2000
      });
    } else {
      if (isValidPath(projectPath)) {
        if (!projectAlreadyExists(projectName, projectPath)) {
          dispatch(addProject(projectName, projectPath));
          setCanRedirect(true);
        } else {
          props.enqueueSnackbar('The project you entered already exists', {
            variant: 'error',
            autoHideDuration: 2000
          });
        }
      } else {
        props.enqueueSnackbar('The path you have entered is not valid', {
          variant: 'error',
          autoHideDuration: 2000
        });
      }
    }
  }

  function selectFolder() {
    if (isElectron()) {
      const options = {
        properties: ['openDirectory']
      };

      const { remote } = window.require('electron');
      remote.dialog.showOpenDialog(options).then(result => {
        let selectedDirectory = result.filePaths[0];
        if (selectedDirectory === undefined) {
          selectedDirectory = '';
        }

        document.querySelector(
          '#project-path-input'
        ).value = replaceBacklashesWithForwardSlashes(selectedDirectory);
        document.querySelector(
          '#project-name-input'
        ).value = getTextAfterLastSlash();
      });
    } else {
      alert('This function is not available on the web.');
    }
  }

  if (canRedirect) {
    return <Redirect to="/editProjects" />;
  }

  return (
    <div className="container">
      <Paper className="container">
        <Typography variant="h6">Project Path</Typography>
        <PathTextInput
          id="project-path-input"
          margin="normal"
          variant="outlined"
          onChange={setDefaultProjectName}
        />

        <Button
          style={{ marginTop: '22px', padding: '10px', marginLeft: '10px' }}
          variant="contained"
          onClick={selectFolder}
        >
          Select directory...
        </Button>

        <br />

        <Typography variant="h6">Project Name</Typography>
        <NameTextInput
          id="project-name-input"
          margin="normal"
          variant="outlined"
        />
      </Paper>

      <br />

      <Button variant="contained" color="secondary" onClick={handleOnClick}>
        Add Project
      </Button>
    </div>
  );
};

export default withSnackbar(AddProjectPage);
