import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Paper, Typography} from "@material-ui/core";

class AddProjectPage extends Component {
    constructor(props) {
        super(props);

        this.setDefaultProjectName = this.setDefaultProjectName.bind(this);
    }


    setDefaultProjectName() {
        console.log(document.querySelector("#project-name-input").value);
        document.querySelector("#project-name-input").value = this.getTextAfterLastBackSlash();
    }

    getTextAfterLastBackSlash() {
        let path = document.querySelector("#project-path-input").value;
        let backslashIndex = path.lastIndexOf("\\");

        return path.substr(backslashIndex + 1, path.length);
    }

    render() {

        return (
            <Paper>
                <Typography variant="h6">
                    Project Path
                </Typography>
                <TextField
                    id="project-path-input"
                    margin="normal"
                    variant="outlined"
                    onChange={this.setDefaultProjectName}
                />

                <Button variant="contained">
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

                <Button variant="contained" color="secondary">
                    Add Project
                </Button>
            </Paper>
        );
    }
}

export default AddProjectPage;