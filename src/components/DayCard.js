import react from 'react';
import  './DayCard.css';
const DayCard = ({reading, dateTime}) =>{

    const date = new Date(reading.dt * 1000);
    const iconSrc = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`
    return(
            <div className="day-card">
                <p>{dateTime(date)}</p>
                <img src={iconSrc} />
                <p className="temp">{reading.temp.day} &#176;C</p>
                <p>{reading.weather[0].description}</p>
             </div>
    )
}

export default DayCard;