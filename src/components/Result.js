import React from 'react';
import './Result.css';

const Result = props => {
    const {
    city,
    temp,
    pressure,
    wind,
    erro,} = props.weatcher;
    const dateBuilder = props.dateTime;

    let content = null;

    if(!erro && city){
        
        content = (
            <div className="content">
                <div className="location-box">
                    <div className="location"><em>{city}</em></div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weatcher-box">
                  <div className="temp">{Math.round(temp)} &#176;C</div>
                  <div className="weatcher">Sunny</div>
                  <div className="pressure">{pressure} hPa</div>
                  <div className="wind">{wind} m/s</div>
                </div>
                
            </div>
        )
    }

    return ( 
        <div className="result">
            {erro ? `Nie mamy w bazie miasta ${city}` : content}
        </div>
     );
}
 
export default Result;