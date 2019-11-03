import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { toggleAppMenu } from "../redux/actions/actionCreators"

const mapStateToProps = state => {
    return {
        theme: state.theme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleAppMenu: () => {
            return dispatch(toggleAppMenu());
        }
    }
}

class StyledLink extends Component {

    getTextColor() {
        if (this.props.theme === "dark") {
            return "white";
        } else {
            return "black";
        }
    }

    render() {
        return (
            <Link to={this.props.to} style={{textDecoration: "none", color: this.getTextColor()}}
                  onClick={this.props.toggleAppMenu}>
                {this.props.children}
            </Link>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StyledLink);