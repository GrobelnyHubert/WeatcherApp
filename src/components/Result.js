import React from 'react';
import './Result.css';


const Result = props => {
    const {
    city,
    temp,
    pressure,
    wind,
    erro,
    icon,
    description
} = props.weatcher;
    const dateBuilder = props.dateTime;

    let content = null;
   
    if(!erro && city ){
        const iconSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`
       
        content = (
        
            <div className="content">
             
                <div className="location-box">
                    <div className="location"><em>{city}</em></div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weatcher-box">
                <div className="icon">
                      <img src={iconSrc} alt="icon" />
                      </div>
                  <div className="temp">{Math.round(temp)} &#176;C</div>
                  <div style={{textTransform: 'capitalize'}} className="weatcher-description">{description}</div>
                  <div className="pressure">Ciśnienie: {pressure} hPa</div>
                  <div className="wind">Wiatr: {wind} m/s</div>            
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