import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsFinishButtonDisabled,
  setNeedsDtmf,
  setNeedsVoice
} from '../redux/actions/actionCreators';

const SelectGrammarType = () => {
  const dispatch = useDispatch();
  const isFinishButtonDisabled = useSelector(
    state => state.isFinishButtonDisabled
  );
  const needsDtmf = useSelector(state => state.needsDtmf);
  const needsVoice = useSelector(state => state.needsVoice);

  function handleChange(event) {
    if (event.currentTarget.value === 'dtmf') {
      dispatch(setNeedsDtmf(!needsDtmf));
    } else {
      dispatch(setNeedsVoice(!needsVoice));
    }
  }

  if (!needsDtmf && !needsVoice) {
    dispatch(setIsFinishButtonDisabled(true));
  } else if ((needsDtmf || needsVoice) && isFinishButtonDisabled) {
    dispatch(setIsFinishButtonDisabled(false));
  }

  return (
    <FormControl component="fieldset">
      <Typography>Which Type(s) of Grammars Do You Need?</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={needsDtmf}
              onChange={handleChange}
              value="dtmf"
            />
          }
          label="DTMF"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={needsVoice}
              onChange={handleChange}
              value="voice"
            />
          }
          label="Voice"
        />
      </FormGroup>
    </FormControl>
  );
};

export default SelectGrammarType;
