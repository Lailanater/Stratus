import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsNextButtonDisabled,
  setMenuName
} from '../redux/actions/actionCreators';

const PageNameInput = props => {
  const menuName = useSelector(state => state.menuName);
  const isNextButtonDisabled = useSelector(state => state.isNextButtonDisabled);
  const dispatch = useDispatch();

  if (menuName === '' && !isNextButtonDisabled) {
    dispatch(setIsNextButtonDisabled(true));
  } else if (menuName !== '' && isNextButtonDisabled) {
    dispatch(setIsNextButtonDisabled(false));
  }

  return (
    <TextField
      label="Menu Name"
      margin="normal"
      variant="outlined"
      helperText={props.helperText}
      required={true}
      error={menuName.length === 0}
      value={menuName}
      onChange={e => dispatch(setMenuName(e.target.value.trim()))}
    />
  );
};

export default PageNameInput;
