import React from 'react';
import './GeneralInfos.css'

const GeneralInfos = (props) => {

    const { city, icon, temp, temp_min, temp_max, description } = props.weather   

    return ( 
        <React.Fragment>
         <h1 className='cityName'>{city.toUpperCase()}</h1>
            <i className={`wi ${icon} mainIcon`}></i>
          <h2>{Math.floor(temp)}&#176;C</h2>
           <h3>
             <span>{Math.floor(temp_min)}&#176;C</span> <span>{Math.floor(temp_max)}&#176;C</span>
           </h3>
           <h3>{description}</h3>
        </React.Fragment>
     );
}
 
export default GeneralInfos;