import React from 'react';
import { useSelector } from 'react-redux';
import OptionTypeInput from './OptionTypeInput';
import Typography from '@material-ui/core/Typography';

const OptionTypeView = () => {
    const dtmfOptions = useSelector(state => state.dtmfOptions);

    return (
        <div>
            {dtmfOptions.length === 0 ? (
                <Typography>No grammar options to edit.</Typography>
            ) : (
                dtmfOptions.map((value, index) => {
                    return <OptionTypeInput key={index} option={index} />;
                })
            )}
        </div>
    );
};

export default OptionTypeView;
