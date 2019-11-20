import React from 'react';
import { useSelector } from "react-redux";
import OptionTypeInput from "./OptionTypeInput";

const OptionTypeView = () => {
    const dtmfOptions = useSelector(state => state.dtmfOptions);

    return (
        <div>
            {dtmfOptions.map((value, index) => {
                return <OptionTypeInput key={index} option={index} />;
            })}
        </div>
    );
};

export default OptionTypeView;