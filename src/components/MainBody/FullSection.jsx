import React from 'react';
//import PlayListBox from './PlayListBox';
import { useLocation } from 'react-router-dom';
import PlayListAll from './PlayListAll';

function FullSection() {
    const location = useLocation();
    const {pathUrl, name} = location.state;
    console.log(location.state);
    //console.log(location.pathUrl);
    return (
        <PlayListAll pathUrl={pathUrl} name={name} />
    );
}

export default FullSection;