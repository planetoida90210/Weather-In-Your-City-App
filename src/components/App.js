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
    utcTime: '',
    time: '',
    city: '',
    sunrise: '',
    sunset: '',
    hummidity: '',
    temp: '',
    tempMin: '',
    tempMax: '',
    description: '',
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
        const date = new Date().toLocaleTimeString()
        const time = [...date].slice(0,5)
        const hours = new Date().getUTCHours()
        const minutes = new Date().getUTCMinutes()
        const timezone = data.timezone / 3600
        const timeNumber = new Date().getHours()
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString() 
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
        const sunriseTime = new Date(data.sys.sunrise * 1000).getHours()
        const sunriseMinutes = new Date(data.sys.sunrise * 1000).getMinutes()
        const sunsetTime = new Date(data.sys.sunset * 1000).getHours()
        const utcTime = hours + timezone >= 24 ? `0${hours + timezone - 24}:${minutes < 10 ? `0${minutes}` : minutes}` : `${hours + timezone}:${minutes < 10 ? `0${minutes}` : minutes}`

        console.log(`${sunriseTime + timezone} : ${sunriseMinutes}`)
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
        let icon = timeNumber >= sunsetTime ? iconsNight[actualIcon] : iconsDay[actualIcon] 
        
        this.setState(prevState => ({
          utcTime: utcTime,
          time: time,
          city: prevState.value,
          sunrise: sunrise,
          sunset: sunset,
          hummidity: data.main.humidity,
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          description: data.weather[0].main,
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
