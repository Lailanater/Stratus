import React, {Component} from 'react';
import {Drawer, List} from "@material-ui/core";
import MenuButton from "../components/MenuButton";
import SettingsIcon from '@material-ui/icons/Settings';
import {toggleAppMenu} from "../redux/actions/actionCreators";
import {connect} from "react-redux";
import StyledLink from "../components/StyledLink";
import AddIcon from '@material-ui/icons/Add';

const mapStateToProps = state => {
    return {
        isAppMenuDisplayed: state.isAppMenuDisplayed,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleAppMenu: () => {
            dispatch(toggleAppMenu());
        }
    };
};

class SideMenu extends Component {

    render() {
        return (
            <Drawer open={this.props.isAppMenuDisplayed} onClose={this.props.toggleAppMenu}>
                <List>
                    <StyledLink to="/addProject">
                        <MenuButton icon={<AddIcon color="primary"/>} text="Add New Project"/>
                    </StyledLink>

                    <StyledLink to="/settings">
                        <MenuButton icon={<SettingsIcon color="secondary"/>} text="Settings"/>
                    </StyledLink>
                </List>
            </Drawer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);