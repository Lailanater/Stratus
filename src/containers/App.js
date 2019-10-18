import React from 'react';
import Header from "../components/Header";
import ButtonMenu from "../components/ButtonMenu";
import {createMuiTheme, Paper, useMediaQuery} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const palette = {
		type: prefersDarkMode ? 'dark' : 'light',
		primary: {main: '#00838F'},
		secondary: {main: '#8C9EFF'}
	};

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: palette
			}),
		[palette],
	);

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Paper>
				<ButtonMenu />
			</Paper>
		</ThemeProvider>
	);
}

export default App;
