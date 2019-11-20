import React from 'react';
import { Radio, Typography } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { setNeedsRepeat } from "../redux/actions/actionCreators";

const NeedsRepeatOptionInput = () => {

    const needsRepeat = useSelector(state => state.needsRepeat);
    const dispatch = useDispatch();

    return (
        <div>
            <Typography>
                Will you need a repeat option?
            </Typography>
            <RadioGroup>
                <FormControlLabel
                    control={<Radio color="secondary" checked={needsRepeat === true} />}
                    label="Yes"
                    onClick={() => dispatch(setNeedsRepeat(true))}
                />
                <FormControlLabel
                    control={<Radio color="secondary" checked={needsRepeat === false} />}
                    label="No"
                    onClick={() => dispatch(setNeedsRepeat(false))}
                />
            </RadioGroup>
        </div>
    );
};

export default NeedsRepeatOptionInput;