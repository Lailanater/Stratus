import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Paper, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/actions/actionCreators";
import { Link } from "react-router-dom";

const path = require('path');
const electron = window.require("electron");

const AddProjectPage = (props) => {

    const dispatch = useDispatch();

    function setDefaultProjectName() {
        console.log(document.querySelector("#project-name-input").value);
        document.querySelector("#project-name-input").value = getTextAfterLastBackSlash();
    }

    function getTextAfterLastBackSlash() {
        let path = document.querySelector("#project-path-input").value;
        let backslashIndex = path.lastIndexOf("\\");

        return path.substr(backslashIndex + 1, path.length);
    }

    function handleOnClick() {
        const projectName = document.querySelector("#project-name-input").value;
        const projectPath = document.querySelector("#project-path-input").value;
        dispatch(addProject(projectName, projectPath));
    }

    return (
        <Paper>
            <Typography variant="h6">
                Project Path
            </Typography>
            <TextField
                id="project-path-input"
                margin="normal"
                variant="outlined"
                onChange={setDefaultProjectName}
            />

            <Button variant="contained" onClick={electron.shell.showItemInFolder(__dirname)}>
                Select directory...
            </Button>

            <br />

            <Typography variant="h6">
                Project Name
            </Typography>
            <TextField
                id="project-name-input"
                margin="normal"
                variant="outlined"
            />

            <br />

            <Link to="/">
                <Button variant="contained" color="secondary" onClick={handleOnClick}>
                    Add Project
                </Button>
            </Link>
        </Paper>
    );
};

export default AddProjectPage;