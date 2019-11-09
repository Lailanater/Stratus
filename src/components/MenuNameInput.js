import React from 'react';
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setMenuName } from "../redux/actions/actionCreators";

const MenuNameInput = () => {

    const menuName = useSelector(state => state.menuName);
    const dispatch = useDispatch();

    return (
        <TextField
            label="Menu Name"
            margin="normal"
            variant="outlined"
            required={true}
            value={menuName}
            onChange={(e) => dispatch(setMenuName(e.target.value))}
        />
    );
};

export default MenuNameInput;