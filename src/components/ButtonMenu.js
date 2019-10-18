import React, {Component} from 'react';
import Button from "@material-ui/core/Button";

class ButtonMenu extends Component {
    render() {
        return (
            <div>
                <Button variant="contained" style={{color: "white", backgroundColor:"#192a56"}} size="large">
                    Create Menu
                </Button>
                <Button variant="contained" style={{color: "white", backgroundColor:"#40739e"}} size="large">
                    Create Grammar
                </Button>
            </div>
        );
    }
}

export default ButtonMenu;