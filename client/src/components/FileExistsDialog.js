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
          <Button
            style={{ padding: '10px', backgroundColor: '#4caf50' }}
            onClick={props.yesOnClick}
          >
            Yes
          </Button>
          <Button
            style={{
              marginLeft: '20px',
              padding: '10px',
              backgroundColor: '#f44336'
            }}
            onClick={props.noOnClick}
          >
            No
          </Button>
        </div>
      </DialogContainer>
    </Dialog>
  );
};

export default FileExistsDialog;
