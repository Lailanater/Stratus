import React, {Component} from 'react';
import {Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

class MenuButton extends Component {
    render() {
        return (
            <div>
                <ListItem button onClick={this.props.onClick}>
                    <ListItemIcon>
                        {this.props.icon}
                    </ListItemIcon>
                    <ListItemText>
                        {this.props.text}
                    </ListItemText>
                </ListItem>
                <Divider/>
            </div>
        );
    }
}

export default MenuButton;