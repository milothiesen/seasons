import './SeasonDisplay.css';
import React from 'react';
import MetAPI from './MetAPI';

const seasonConfig = {
    summer: {
        // text: '*it is warm in your hemisphere*',
        searchTerm: 'swimming',
    },
    winter: {
        // text: '*it is cold in your hemisphere*',
        searchTerm: 'snow',
    },
};

const getSeason = (lat, month) => {
    if (month > 2 && month < 9) {
        return lat > 0 ? 'summer' : 'winter';
    } else {
        return lat > 0 ? 'winter' : 'summer';
    }
};

const SeasonDisplay = (props) => {
    const season = getSeason(props.lat, new Date().getMonth());
    // const { text, searchTerm } = seasonConfig[season];
    const { searchTerm } = seasonConfig[season];
    return (
        <div className={`season-display ${season}`}>
            {/* <h1>{text}</h1> */}
            <MetAPI season={searchTerm} />
        </div>
    );
};

export default SeasonDisplay;
