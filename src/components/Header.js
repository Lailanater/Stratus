import React, {Component} from 'react';
import {
    AppBar,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/Button";
import {connect} from "react-redux";
import {toggleAppMenu} from "../redux/actions/actionCreators";
import SettingsIcon from '@material-ui/icons/Settings';

const mapStateToProps = state => {
    return {
        isAppMenuDisplayed: state.isAppMenuDisplayed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleAppMenu: () => {
            dispatch(toggleAppMenu());
        }
    };
};

class Header extends Component {

    render() {
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.props.toggleAppMenu}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h5">
                            VXML Generator
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.props.isAppMenuDisplayed} onClose={this.props.toggleAppMenu}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Settings
                            </ListItemText>
                        </ListItem>
                        <Divider/>
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);