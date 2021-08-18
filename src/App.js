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

handleCitySubmit = (e) =>{
  e.preventDefault()
  const API =`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=d7b3751077889d54b180636f32444101`;
  axios.get(API)
  .then(res => {
    const weatchers = res.data;
    console.log(res.data)
    this.setState({ erro: false })
  })
  .catch(err => 
      this.setState({
        erro:true
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
    <div className="App">
        <Form value={this.props.value} 
        change={this.handleInputChange} 
        submit={this.handleCitySubmit}
        />
        <Result error={this.state.erro} />
    </div> 
  );
}
}

export default App;
