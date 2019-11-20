import React from 'react';
import { Radio, Typography } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultRouteTo } from "../redux/actions/actionCreators";

const DefaultRouteTypeInput = () => {

    const defaultRouteTo = useSelector(state => state.defaultRouteTo);
    const dispatch = useDispatch();

    return (
        <div>
            <Typography>
                When you default route on this menu where should you go?
            </Typography>
            <RadioGroup>
                <FormControlLabel
                    value="calltype"
                    control={<Radio color="secondary" checked={defaultRouteTo === "calltype"} />}
                    label="Calltype"
                    onClick={() => dispatch(setDefaultRouteTo("calltype"))}
                />
                <FormControlLabel
                    value="menu"
                    control={<Radio color="secondary" checked={defaultRouteTo === "menu"} />}
                    label="Menu"
                    onClick={() => dispatch(setDefaultRouteTo("menu"))}
                />
            </RadioGroup>
        </div>
    );
};

export default DefaultRouteTypeInput;