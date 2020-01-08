import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const Wrapper = props => {
  const theme = useSelector(state => state.theme);
  let currentTheme = createMuiTheme({
    palette: {
      type: theme,
      primary: { main: '#00838F' },
      secondary: { main: '#ed407a' }
    }
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <SnackbarProvider maxSnack={2}>{props.children}</SnackbarProvider>
    </ThemeProvider>
  );
};

export default Wrapper;
