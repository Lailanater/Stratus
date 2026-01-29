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

const Header = props => {
  const dispatch = useDispatch();
  const { user, signOut, signInWithGithub } = props;

  function getAuthButton() {
    if (!signInWithGithub && !signOut) {
      return null;
    }

    if (user) {
      return <Button onClick={signOut}>Sign Out</Button>;
    } else {
      return <Button onClick={signInWithGithub}>Sign In</Button>;
    }
  }

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
          {getAuthButton()}
        </Toolbar>
      </AppBar>
      <SideMenu />
    </div>
  );
};

let ExportedComponent = Header;

try {
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const firebaseAppAuth = firebaseApp.auth();
  const providers = {
    githubProvider: new firebase.auth.GithubAuthProvider()
  };

  ExportedComponent = withFirebaseAuth({
    providers,
    firebaseAppAuth
  })(Header);
} catch {}

export default ExportedComponent;
