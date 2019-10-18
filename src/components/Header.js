import React from 'react';
import {AppBar, Toolbar, Typography, useTheme} from "@material-ui/core";
import {Brightness3, Brightness7} from "@material-ui/icons";
import IconButton from "@material-ui/core/Button";

function Header() {
	const theme = useTheme();

	function displayThemeButton() {
		console.log(theme.palette.type);
		console.log(typeof theme.palette.type);
		if (theme.palette.type === "light") {
			return <Brightness7 />;
		}
		else {
			return <Brightness3 />;
		}
	}

	return (
		<AppBar position="fixed">
			<Toolbar>
				<Typography variant="h5">
					VXML Generator
				</Typography>
				<IconButton aria-label="Switch Theme" color="inherit">{displayThemeButton()}</IconButton>
			</Toolbar>
		</AppBar>
	);
}

export default Header;