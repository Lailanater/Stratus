import React, { useState } from 'react';
import { Radio, Typography } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setDtmfOptions } from '../redux/actions/actionCreators';
import { useDispatch, useSelector } from 'react-redux';

const OptionTypeInput = props => {
    const dtmfOptions = useSelector(state => state.dtmfOptions);
    const [calltypeChecked, setCalltypeChecked] = useState(
        dtmfOptions[props.option] === 'calltype'
    );
    const [menuChecked, setMenuChecked] = useState(
        dtmfOptions[props.option] === 'menu'
    );
    const dispatch = useDispatch();

    if (dtmfOptions[props.option] === undefined) {
        let newDtmfOptions = dtmfOptions;
        newDtmfOptions[props.option] = 'calltype';
        dispatch(setDtmfOptions(newDtmfOptions));
    }

    return (
        <div>
            <Typography>Where does option {props.option + 1} go?</Typography>
            <RadioGroup>
                <FormControlLabel
                    value="calltype"
                    control={
                        <Radio color="secondary" checked={calltypeChecked} />
                    }
                    label="Calltype"
                    onClick={() => {
                        let newDtmfOptions = dtmfOptions;
                        newDtmfOptions[props.option] = 'calltype';
                        setCalltypeChecked(true);
                        setMenuChecked(false);
                        dispatch(setDtmfOptions(newDtmfOptions));
                    }}
                />
                <FormControlLabel
                    value="menu"
                    control={<Radio color="secondary" checked={menuChecked} />}
                    label="Menu"
                    onClick={() => {
                        let newDtmfOptions = dtmfOptions;
                        newDtmfOptions[props.option] = 'menu';
                        setCalltypeChecked(false);
                        setMenuChecked(true);
                        dispatch(setDtmfOptions(newDtmfOptions));
                    }}
                />
            </RadioGroup>
        </div>
    );
};

export default OptionTypeInput;
