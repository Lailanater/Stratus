import React from 'react';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setNumOfOptions } from "../redux/actions/actionCreators";

const OptionPicker = (props) => {

    const numOfOptions = useSelector(state => state.numOfOptions);
    const dispatch = useDispatch();

    const marks = setMarks();

    function setMarks() {
        let marks = [];
        for (let i = 0; i < props.maxOptions; i++) {
            marks.push({
                value: i,
                label: i.toString(),
            });
        }
        return marks;
    }

    function handleChange(event, value) {
        if (value !== numOfOptions) {
            dispatch(setNumOfOptions(value));
        }
    }

    return (
        <div>
            <Typography id="discrete-slider-custom" gutterBottom>
                How many options are you going to need?
            </Typography>
            <Slider
                value={numOfOptions}
                step={1}
                valueLabelDisplay="auto"
                max={props.maxOptions}
                marks={marks}
                onChange={handleChange}
            />
        </div>
    );
};

export default OptionPicker;