import react from 'react';

const DayCard = ({reading, dateTime}) =>{

    const date = new Date(reading.dt * 1000);
    const iconSrc = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`
    return(
            <div>
                <p>{dateTime(date)}</p>
                <p>{reading.temp.day} &#176;C</p>
                <p>{reading.weather[0].description}</p>
                <img src={iconSrc} />
             </div>
    )
}

export default DayCard;