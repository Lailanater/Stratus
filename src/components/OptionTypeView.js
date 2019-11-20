import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Radio, Typography } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { setDefaultRouteTo, setDtmfOptions } from "../redux/actions/actionCreators";
import OptionTypeInput from "./OptionTypeInput";

const OptionTypeView = () => {
    const dtmfOptions = useSelector(state => state.dtmfOptions);

    return (
        <div>
            {dtmfOptions.map((value, index) => {
                return <OptionTypeInput option={index}/>
            })}
        </div>
    );
};

export default OptionTypeView;