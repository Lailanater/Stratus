import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { setDtmfOptions } from '../redux/actions/actionCreators';
import '../css/components/OptionPicker.css';

const OptionPicker = props => {
  const dtmfOptions = useSelector(state => state.dtmfOptions);
  const [numOfOptions, setNumOfOptions] = useState(dtmfOptions.length);
  const dispatch = useDispatch();

  const marks = setMarks();

  function setMarks() {
    let marks = [];
    for (let i = 0; i <= props.maxOptions; i++) {
      marks.push({
        value: i,
        label: i.toString()
      });
    }
    return marks;
  }

  function setDefaultsForDtmfOptions(newSize) {
    let newDtmfOptions = dtmfOptions;
    if (dtmfOptions.length < newSize) {
      for (let i = dtmfOptions.length; i < newSize; i++) {
        newDtmfOptions[i] = 'calltype';
      }
    } else if (dtmfOptions.length > newSize) {
      newDtmfOptions.length = newSize;
    }
    setNumOfOptions(newDtmfOptions.length);
    return newDtmfOptions;
  }

  function handleChange(event, value) {
    if (value !== dtmfOptions.length) {
      dispatch(setDtmfOptions(setDefaultsForDtmfOptions(value)));
    }
  }

  return (
    <div>
      <Typography id="discrete-slider-custom" gutterBottom>
        How many options are you going to need?
      </Typography>
      <Slider
        id="optionSlider"
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
