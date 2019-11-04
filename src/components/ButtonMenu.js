import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class ButtonMenu extends Component {
    render() {
        return (
            <div>
                <Link to="/createMenu">
                    <Button variant="contained" style={{color: "white", backgroundColor: "#192a56"}} size="large">
                        Create Menu
                    </Button>
                </Link>
                <Link to="/createGrammar">
                    <Button variant="contained" style={{color: "white", backgroundColor: "#40739e"}} size="large">
                        Create Grammar
                    </Button>
                </Link>
            </div>
        );
    }
}

export default ButtonMenu;