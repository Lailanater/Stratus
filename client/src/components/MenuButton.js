import React from 'react';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const MenuButton = props => {
  return (
    <div>
      <ListItem button onClick={props.onClick}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText>{props.text}</ListItemText>
      </ListItem>
      <Divider />
    </div>
  );
};

export default MenuButton;
