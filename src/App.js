import react, {Component} from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import axios from 'axios';

class App extends Component {

state = {
  value: '',
  date: '',
  city: '',
  sunrise: '',
  sunset: '',
  temp: '',
  pressure: '',
  wind: '',
  erro: false,
}

dateBuilder = (d) =>{
  let months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  let days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

handleCitySubmit = (e) =>{
  e.preventDefault()
  const API =`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=d7b3751077889d54b180636f32444101&units=metric`;
  axios.get(API)
  .then(res => {
    const weatchers = res.data;
    this.setState({ 
      erro: false,
      sunrise: weatchers.sys.sunrise,
      sunset: weatchers.sys.sunset,
      temp: weatchers.main.temp,
      pressure: weatchers.main.pressure,
      wind: weatchers.wind.speed,
      city: this.state.value
    })
  })
  .catch(err => 
      this.setState({
        erro:true,
        city: this.state.value
      })
    )
}
handleInputChange = (e) =>{
  this.setState({
    value: e.target.value
  })
}
  render(){
  return (
    <div className="app">
      <main>
          <Form value={this.props.value} 
          change={this.handleInputChange} 
          submit={this.handleCitySubmit}
          />
          <Result weatcher={this.state} dateTime={this.dateBuilder}/>
        </main>
    </div> 
  );
}
}

export default App;
