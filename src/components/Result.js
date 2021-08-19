import React from 'react';

const Result = props => {
    const {
    city,
    sunrise,
    sunset,
    temp,
    pressure,
    wind,
    erro,} = props.weatcher;
    const dateBuilder = props.dateTime;

    let content = null;

    if(!erro && city){
        const sunriseTime = new Date(sunrise * 1000).toLocaleString();
        const sunsetTime = new Date(sunset * 1000).toLocaleString();

        content = (
            <div>
                <p>Wyniki wyszukiwania dla <em>{city}</em></p>
                <p>Aktualna temperatura {temp} &#176;C</p>
                <p>Wschód słońca dzisiaj o {sunsetTime}</p>
                <p>Zachód słońca dzisiaj o {sunriseTime}</p>
                <p>Siła wiatru {wind} m/s</p>
                <p>Aktualne ciśnienie {pressure} hPa</p>
                <p>{dateBuilder(new Date())}</p>
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