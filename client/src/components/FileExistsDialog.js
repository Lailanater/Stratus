import React from 'react';
import { Button, Dialog, DialogContentText, DialogTitle } from "@material-ui/core";

const FileExistsDialog = (props) => {
    let open = true;

    function handleClose() {

    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div id="fileExistsDialogContainer">
                <DialogTitle id="fileExistsDialogTitle">{props.fileName} already exists.</DialogTitle>
                <DialogContentText>Are you sure you want to overwrite it?</DialogContentText>
                <div id="fileExistsDialogButtonContainer">
                    <Button id="fileExistsDialogYesButton" style={{backgroundColor: "#4caf50"}}>Yes</Button>
                    <Button id="fileExistsDialogNoButton" style={{backgroundColor: "#f44336"}}>No</Button>
                </div>
            </div>
        </Dialog>
    );
};

export default FileExistsDialog;