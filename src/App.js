// eslint-disable-next-line
import react, {Component} from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import axios from 'axios';
import DayCard from './components/DayCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
class App extends Component {

state = {
  value: '',
  date: '',
  city: '',
  temp: '',
  pressure: '',
  wind: '',
  erro: false,
  icon: '',
  description: '',
  coord:{
    lat:'',
    lon:''
  },
  dailyData: []
}

dateBuilder = (d) =>{
  let months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  let days = ["Niedziela","Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

handleCitySubmit = (e) =>{
  e.preventDefault()
  
  this.handleSendRequestCity()

}
handleSendRequestCity =  () => {
  const API =`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=d7b3751077889d54b180636f32444101&units=metric&lang=pl`;
  try {
    axios.get(API)
    .then(res => {
      const weatchers = res.data;
      this.setState({
        coord:{
          lat: weatchers.coord.lat,
          lon: weatchers.coord.lon
        },
      })
    })
    .then( (response) =>{
      const ApiLat = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coord.lat}&lon=${this.state.coord.lon}&exclude=minutely,alerts&appid=d7b3751077889d54b180636f32444101&units=metric&lang=pl`;
      axios.get(ApiLat)
        .then(res =>{
         
          const weatcher = res.data;
          const filterDailyData = weatcher.daily.filter((_, i) => i > 0);
          this.setState({
            temp: weatcher.current.temp,
            pressure:weatcher.current.pressure,
            description: weatcher.current.weather[0].description,
            icon: weatcher.current.weather[0].icon,
            city: this.state.value,
            wind: weatcher.current.wind_speed,
            dailyData: filterDailyData
          })
        })
        .catch(err => {
          this.setState({
            erro: true
          })
        })
    })
    .catch(err => 
        this.setState({
          erro:true,
          city: this.state.value
        })
      )
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};

handleInputChange = (e) =>{
  this.setState({
    value: e.target.value
  })
}
formatDayCards = () => {
  return this.state.dailyData.map((reading, index) => 
  
  <DayCard dateTime={this.dateBuilder} reading={reading} key={index} />)
}
  render(){
  return (
    <div className={this.state.temp > 16 ? 'app' : 'app cold'}>
      <main>
        
          <Form value={this.props.value} 
          change={this.handleInputChange} 
          submit={this.handleCitySubmit}
          />
          <Result weatcher={this.state} dateTime={this.dateBuilder}/>
          <Carousel   responsive={responsive}>
          {this.formatDayCards()}
          </Carousel>
        </main>
    </div> 
  );
}
}

export default App;
