import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/Button';
import SideMenu from '../pages/SideMenu';
import { Link } from 'react-router-dom';
import 'firebase/auth';
import PropTypes from 'prop-types';

const Header = props => {

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                        <Typography variant="h5">Stratus</Typography>
                    </Link>
                    {
                        props.signedIn
                        ?
                            <Button>Sign Out</Button>
                            :
                            <Button>Sign In</Button>
                    }
                </Toolbar>
            </AppBar>
            <SideMenu />
        </div>
    );
};

Header.propTypes = {
  signedIn: PropTypes.bool.isRequired
};

export default Header;
