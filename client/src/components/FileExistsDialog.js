import React from 'react';
import {
  Button,
  Dialog,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import styled from 'styled-components';

const DialogContainer = styled.div`
  padding: 20px;
`;

const YesButton = styled(Button)`
  padding: 10px;
  background-color: #4caf50;
`;

const NoButton = styled(Button)`
  margin-left: 20px;
  padding: 10px;
  background-color: #f44336;
`;

const FileExistsDialog = props => {
  return (
    <Dialog open={props.open}>
      <DialogContainer>
        <DialogTitle id="fileExistsDialogTitle">
          {props.fileName} already exists.
        </DialogTitle>
        <DialogContentText>
          Are you sure you want to overwrite it?
        </DialogContentText>
        <div className="centerText">
          <YesButton onClick={props.yesOnClick}>Yes</YesButton>
          <NoButton onClick={props.noOnClick}>No</NoButton>
        </div>
      </DialogContainer>
    </Dialog>
  );
};

export default FileExistsDialog;
