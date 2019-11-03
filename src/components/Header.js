import React, {Component} from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/Button";
import {connect} from "react-redux";
import {toggleAppMenu} from "../redux/actions/actionCreators";
import SideMenu from "../containers/SideMenu";
import {Link} from "react-router-dom"

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
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.props.toggleAppMenu}>
                            <MenuIcon/>
                        </IconButton>
                        <Link to="/" style={{textDecoration: "none", color: "white"}}>
                            <Typography variant="h5">
                                VXML Generator
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
                <SideMenu/>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Header);