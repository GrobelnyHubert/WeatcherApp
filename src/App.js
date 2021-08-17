import react, {Component} from 'react';
import './App.css';
import Form from './components/Form';

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
  erro: ''
}


handleCitySubmit = e =>{
  e.preventDefault()
  const API = `api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=add09926832f15baef58a06605d34726&units=metric`;
 
  fetch(API)
  .then(resp => {
    if(resp.ok){
      return resp
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
