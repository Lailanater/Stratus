import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        theme: state.theme
    };
};

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
            <Link to={this.props.to} style={{textDecoration: "none", color: this.getTextColor()}}>
                {this.props.children}
            </Link>
        );
    }
}

export default connect(mapStateToProps)(StyledLink);