import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Auth0Provider } from '../react-auth0-spa';
import config from '../auth_config';
import history from '../utils/history';

const Wrappers = props => {
  const theme = useSelector(state => state.theme);
  let currentTheme = createMuiTheme({
    palette: {
      type: theme,
      primary: { main: '#00838F' },
      secondary: { main: '#ed407a' }
    }
  });

  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  console.log(window.location.origin);

  return (
    <ThemeProvider theme={currentTheme}>
      <Auth0Provider
        onRedirectCallback={onRedirectCallback}
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
      >
        <SnackbarProvider maxSnack={2}>{props.children}</SnackbarProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default Wrappers;
