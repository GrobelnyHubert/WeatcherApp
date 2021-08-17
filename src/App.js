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
  persons: []
}
componentDidMount() {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=d7b3751077889d54b180636f32444101`)
  .then(resp => console.log(resp.data))
    .catch(err => console.log(err))
}
 


handleCitySubmit = e =>{
  e.preventDefault()
  const API = `api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=d7b3751077889d54b180636f32444101&units=metric`;
  const APIS = `api.openweathermap.org/data/2.5/weather?q=London&appid=d7b3751077889d54b180636f32444101`;
  fetch(APIS, {
    headers : { 
      'Content-Type': 'application/json',
     }

  })
  .then(resp => {
    if(resp.ok){
      return resp;
    }
    throw Error("Błąd")
  })
  .then(resp => resp.json())
  .then(text => console.log(text))
  .catch(err => console.log(err))

}

handleInputChange = (e) =>{
  this.setState({
    value: e.target.value
  })
}
  render(){
  return (
    <>
    <div className="App">
        <Form value={this.props.value} 
        change={this.handleInputChange} 
        submit={this.handleCitySubmit}
        />
    </div>
     
        <ul>
          { this.state.persons.map(person => <li>{person.name}</li>)}
        </ul>
     </>
  );
}
}

export default App;
