import React, {Component} from 'react';
import {AppBar, Drawer, List, Toolbar, Typography} from "@material-ui/core";
import MenuButton from "../components/MenuButton";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/Button";
import {connect} from "react-redux";
import {setCurrentPage, toggleAppMenu} from "../redux/actions/actionCreators";
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import SettingsPage from "../containers/SettingsPage";

const mapStateToProps = state => {
    return {
        isAppMenuDisplayed: state.isAppMenuDisplayed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleAppMenu: () => {
            dispatch(toggleAppMenu());
        },
        setCurrentPage: (nextPage) => {
            dispatch(setCurrentPage(nextPage));
        }
    };
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.goToSettingsPage = this.goToSettingsPage.bind(this);
    }

    goToSettingsPage() {
        this.props.toggleAppMenu();
        this.props.setCurrentPage(<SettingsPage/>);
    }

    render() {
        return (
            <div>
                <AppBar position="static">
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
                        <MenuButton icon={<AddIcon color="primary"/>} text="Add New Project" onClick={null}/>
                        <MenuButton icon={<SettingsIcon color="secondary"/>} text="Settings"
                                    onClick={this.goToSettingsPage}/>
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);