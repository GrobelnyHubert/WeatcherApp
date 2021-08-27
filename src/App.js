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
  icon: '',
  description: '',
  coord:{
    lat:'',
    lon:''
  }
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
handleSendRequestCity =  async () => {
  const API =`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=d7b3751077889d54b180636f32444101&units=metric&lang=pl`;
  try {
    axios.get(API)
    .then(res => {
      const weatchers = res.data;
      console.log(res.data);
      this.setState({
        coord:{
          lat: weatchers.coord.lat,
          lon: weatchers.coord.lon
        },
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
handleGetApiData = () =>{
  const ApiLat = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coord.lat}&lon=${this.state.coord.lon}&exclude=minutely,alerts&appid=d7b3751077889d54b180636f32444101&units=metric&lang=pl`
  axios.get(ApiLat)
  .then(res =>{
    console.log(res)
  })
}
handleInputChange = (e) =>{
  this.setState({
    value: e.target.value
  })
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
        </main>
    </div> 
  );
}
}

export default App;
