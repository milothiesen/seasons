import './SeasonDisplay.css';
import React from 'react';
import MetAPI from './MetAPI';

const seasonConfig = {
    summer: {
        text: '*it is warm in your hemisphere*',
        iconName: 'sun',
    },
    winter: {
        text: '*it is cold in your hemisphere*',
        iconName: 'snow',
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
    const { text, iconName } = seasonConfig[season];

    return (
        <div className={`season-display ${season}`}>
            {/* <i className={`icon-left massive ${iconName} icon`} /> */}
            <h1>{text}</h1>

            {/* <i className={`icon-right massive ${iconName} icon`} /> */}
            <MetAPI />
        </div>
    );
};

export default SeasonDisplay;
