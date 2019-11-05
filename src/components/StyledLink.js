import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAppMenu } from "../redux/actions/actionCreators";

const StyledLink = (props) => {
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    function getTextColor() {
        if (theme === "dark") {
            return "white";
        } else {
            return "black";
        }
    }

    return (
        <Link to={props.to} style={{textDecoration: "none", color: getTextColor()}}
              onClick={() => dispatch(toggleAppMenu())}>
            {props.children}
        </Link>
    );
};

export default StyledLink;