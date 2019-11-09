import React from 'react';
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { setMenuName } from "../redux/actions/actionCreators";

const MenuNameInput = () => {

    const dispatch = useDispatch();

    return (
        <TextField
            label="Menu Name"
            margin="normal"
            variant="outlined"
            required={true}
            onChange={(e) => dispatch(setMenuName(e.target.value))}
        />
    );
};

export default MenuNameInput;