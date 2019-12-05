import React, { Component } from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css'
import Form from './Form';
import Result from './Result'

// key to API
const APIKey = '6daea6a791612791db952ad237125a84'

class App extends Component {

  state = {
    value: '',
    time: '',
    city: '',
    sunrise: '',
    sunset: '',
    hummidity: '',
    temp: '',
    tempMin: '',
    tempMax: '',
    description: '',
    pressure: '',
    wind: '',
    icon: '',
    err: false,
    messageButtons : [
      {
        id: 0,
        name: 'wi wi-time-2',
        message: 'time',
        additionalBtn: true,
      },
      {
        id: 1,
        name: 'wi wi-sunrise',
        message: 'sunrise',
        additionalBtn: false,
      },
      {
        id: 2,
        name: 'wi wi-sunset',
        message: 'sunset',
        additionalBtn: false,
      },
      {
        id: 3,
        name: 'wi wi-raindrop',
        message: 'hummidity',
        additionalBtn: false,
      },
    ]  
  }

 

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value 
    })
  }


  handleMessageButtonClick = (e) => {
   
    const activeButton = e.currentTarget.id
    let btn = this.state.messageButtons[activeButton].additionalBtn
    const buttons = this.state.messageButtons.slice()
    buttons.forEach((button) =>{
      if(button.id == activeButton){
        button.additionalBtn = !btn
      } else{
        button.additionalBtn = false
      }
    })
    this.setState({
      buttons
    })
    
   }
  
   
  handleCitySubmit = (e) => {
    e.preventDefault()
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;

    fetch(API)
      .then(response=> {
        if(response.ok) {
          return response
        }
        throw Error('Nie udało się')
      })
      .then(response => response.json())
      .then(data =>{
        const time = new Date().toLocaleTimeString()
        const time1 = new Date().toLocaleDateString()
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString() 
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
        console.log(time1)
        const iconsDay = {
          Thunderstorm: 'wi-thunderstorm',
          Drizzle: 'wi-sleet',
          Rain: 'wi-day-rain',
          Snow: 'wi-snow',
          Mist: 'wi-day-fog',
          Clouds: 'wi-cloud',
          Clear: 'wi-day-sunny',
        }

        const iconsNight = {
          Thunderstorm: 'wi-thunderstorm',
          Drizzle: 'wi-night-alt-sleet',
          Rain: 'wi-night-alt-rain',
          Snow: 'wi-snow',
          Mist: 'wi-night-fog',
          Clouds: 'wi-night-alt-cloudy',
          Clear: 'wi-night-clear',
        }
        
        let actualIcon = data.weather[0].main
        let icon = time >= data.sys.sunset ? iconsNight[actualIcon] : iconsDay[actualIcon] && time <= data.sys.sunrise ? iconsDay[actualIcon] : iconsNight[actualIcon]
        
        this.setState(prevState => ({
          time: time,
          city: prevState.value,
          sunrise: sunrise,
          sunset: sunset,
          hummidity: data.main.humidity,
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          description: data.weather[0].main,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          icon: icon,
          err: false,
          value: '',
        }))
       
      })
      .catch(err => {
        this.setState(prevState => ({
          err: true,
          city: prevState.value,
        }))
        console.log(err)
      })
  }


  render() {
    return (
     <div className='app'>
       <Form 
       value={this.state.value} 
       inputChange={this.handleInputChange}
       submit={this.handleCitySubmit}
       />
       <Result click={this.handleMessageButtonClick} weather={this.state}/>
     </div>
    );
  }
}

export default App;
