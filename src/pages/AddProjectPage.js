import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Paper, Typography } from "@material-ui/core";

const AddProjectPage = (props) => {

    function setDefaultProjectName() {
        console.log(document.querySelector("#project-name-input").value);
        document.querySelector("#project-name-input").value = getTextAfterLastBackSlash();
    }

    function getTextAfterLastBackSlash() {
        let path = document.querySelector("#project-path-input").value;
        let backslashIndex = path.lastIndexOf("\\");

        return path.substr(backslashIndex + 1, path.length);
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

            <Button variant="contained">
                Select directory...
            </Button>

            <br/>

            <Typography variant="h6">
                Project Name
            </Typography>
            <TextField
                id="project-name-input"
                margin="normal"
                variant="outlined"
            />

            <br/>

            <Button variant="contained" color="secondary">
                Add Project
            </Button>
        </Paper>
    );
};

export default AddProjectPage;