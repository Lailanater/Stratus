import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import SideMenu from '../pages/SideMenu';
import { Link } from 'react-router-dom';
import { toggleAppMenu } from '../redux/actions/actionCreators';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  githubProvider: new firebase.auth.GithubAuthProvider()
};

const Header = props => {
  const dispatch = useDispatch();
  const { user, signOut, signInWithGithub } = props;

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
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h5">Stratus</Typography>
          </Link>
          {user ? (
            <Button onClick={signOut}>Sign Out</Button>
          ) : (
            <Button onClick={signInWithGithub}>Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
      <SideMenu />
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Header);
