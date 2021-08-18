import react, {Component} from 'react';
import './App.css';
import Form from './components/Form';
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
  erro: '',
  weatchers: []
}

handleCitySubmit = (e) =>{
  e.preventDefault()
  const API =`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=d7b3751077889d54b180636f32444101`;
  axios.get(API)
  .then(res => {
    const weatcher = res.data;
    console.log(res.data)
    this.setState({ weatcher })
  })
    .catch(err => console.log(err))
}
handleInputChange = (e) =>{
  this.setState({
    value: e.target.value
  })
}
  render(){
  return (
    <div className="App">
        <Form value={this.props.value} 
        change={this.handleInputChange} 
        submit={this.handleCitySubmit}
        />
    </div> 
  );
}
}

export default App;
