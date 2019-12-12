import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import SideMenu from '../pages/SideMenu';
import { Link } from 'react-router-dom';
import { toggleAppMenu } from '../redux/actions/actionCreators';

const Header = props => {
    const dispatch = useDispatch();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => dispatch(toggleAppMenu())}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link
                        to="/"
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        <Typography variant="h5">Stratus</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <SideMenu />
        </div>
    );
};

export default Header;
