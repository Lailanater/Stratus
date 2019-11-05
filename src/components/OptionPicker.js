import React from 'react';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const OptionPicker = (props) => {

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

    return (
        <div>
            <Typography id="discrete-slider-custom" gutterBottom>
                How many options are you going to need?
            </Typography>
            <Slider
                defaultValue={0}
                step={1}
                valueLabelDisplay="auto"
                max={props.maxOptions}
                marks={marks}
            />
        </div>
    );
};

export default OptionPicker;