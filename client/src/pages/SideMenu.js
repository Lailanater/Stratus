import React from 'react';
import { Drawer, List } from "@material-ui/core";
import MenuButton from "../components/MenuButton";
import SettingsIcon from '@material-ui/icons/Settings';
import { toggleAppMenu } from "../redux/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import StyledLink from "../components/StyledLink";
import EditIcon from '@material-ui/icons/Edit';

const SideMenu = (props) => {

    const isAppMenuDisplayed = useSelector(state => state.isAppMenuDisplayed);
    const dispatch = useDispatch();

    return (
        <Drawer open={isAppMenuDisplayed} onClose={() => dispatch(toggleAppMenu())}>
            <List>
                <StyledLink to="/editProjects">
                    <MenuButton icon={<EditIcon color="primary" />} text="Edit Projects" />
                </StyledLink>

                <StyledLink to="/settings">
                    <MenuButton icon={<SettingsIcon color="secondary" />} text="Settings" />
                </StyledLink>
            </List>
        </Drawer>
    );
};

export default SideMenu;