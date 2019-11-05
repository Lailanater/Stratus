import React from 'react';
import ButtonMenu from "../components/ButtonMenu";
import CurrentProjectDropdown from "../components/CurrentProjectDropdown";

const HomePage = (props) => {
    return (
        <div>
            <CurrentProjectDropdown/>
            <ButtonMenu/>
        </div>
    );
};

export default HomePage;