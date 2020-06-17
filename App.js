import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "001fe92ed831b5e6bcfb132a53b2139c";

export default class extends React.Component {
state = {
  isLoading : true
}
  getWeather = async(latitude, longitude) => {
    const {
      data : {
        main :{temp},
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    
    this.setState({
      isLoading : false, 
      temp,
      condition:weather[0].main
    });
  }
  getLocation = async() => {
    try{
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}
    } = await Location.getCurrentPositionAsync();
    this.getWeather(latitude, longitude);
    
      //send to API and get Weather
    }catch (error) {
      Alert.alert("Can't find you.", "So Sad");
    }
  }

  componentDidMount(){
    this.getLocation();
  }
  render(){
    const {isLoading, temp, condition} = this.state;
    console.log(condition);
    return isLoading ? <Loading/> : <Weather temp = {Math.round(temp)} condition={condition}/>;
  }
}

