import axios from 'axios';
import React, { useState } from 'react'


function Project() {
  const [city, setcity] = useState(null);
  const [data, setData] = useState({
    name: "",
    temp: 0,
    description: "",
    wind: 0,
    icon: "",
    humidity: 0,
    image:"./images/weather.png"
  });

  const handler = () => {
    if (city !== "") {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=123f76b33da477a1dab05751076d822d&units=metric&Wind speed=miles/hour`)
        .then((res) => {
          // console.log(res.data)
          let imgpath = "";
          if (res.data.weather[0].description === "clear sky") {
            imgpath = "./images/clear.png"
          }
          else if (res.data.weather[0].description === "mostly Cloudy") {
            imgpath = "./images/cloudy.png"
          }
          else if (res.data.weather[0].description === "Rain") {
            imgpath = "./images/rain.png"
          }
          else if (res.data.weather[0].description === "stormy") {
            imgpath = "./images/strom.png"
          }
          else if (res.data.weather[0].description === "sunny") {
            imgpath = "./images/sunny.png"
          }
          
          else if (res.data.weather[0].description === "haze") {
            imgpath = "./images/sunny.png"
          }
          else {
            imgpath = "./images/weather.png"
          }
          setData({
            name: res.data.name,
            temp: res.data.main.temp,
            description: res.data.weather[0].description,
            wind: res.data.wind.speed,
            humidity: res.data.main.humidity,
            image: imgpath
          })
        }).catch(err => console.log(err));
    }

  }


  return (
    <>
      <div className="main">
        <div className="inp">
          <input type='text' id='inp-btn' placeholder='Type..' value={city} onChange={(e) => {
            //  console.log(e.target.value)
            setcity(e.target.value)
          }} />
          <button type='submit' onClick={handler}>Search</button>
        </div>
        <div className="first">
          <img src={data.image} alt='images' />
          <h3>{data.temp}°C</h3>
          <h4>{data.name}</h4>
        </div>
        <div className="sec">
          <div>
            <p>{data.humidity}%</p>
            <i class="fa-sharp fa-solid fa-droplet fa-beat"></i>
          </div>
          <div>
            <p>{data.description}</p>
          </div>
          <div>
            <p>{data.wind}km/h</p>
            <i id='left' class="fa-solid fa-wind fa-beat"></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project