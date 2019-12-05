import React from 'react';
import MessageButton from './MessageButton'
import GeneralInfos from './GeneralInfos'

import './Result.css';

const Result = (props) => {

    const {err, city } = props.weather

    let content = null

    if(!err && city) {

    
        content = (
        <React.Fragment>
        <GeneralInfos weather={props.weather} />
        <MessageButton click={props.click} weather={props.weather} />
        </React.Fragment>
        )
    }

    return ( 
        <div className="result">
            {err ? `${city} is not in database.` : content}
        </div>
     );
}
 
export default Result;


