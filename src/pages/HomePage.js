import React from 'react';
import ButtonMenu from "../components/ButtonMenu";
import CurrentProjectDropdown from "../components/CurrentProjectDropdown"

function HomePage() {
    return (
        <div>
            <CurrentProjectDropdown />
            <ButtonMenu/>
        </div>
    );
}

export default HomePage;