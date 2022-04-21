import React, { useState } from "react";

const api = {
  key: "493add9ac9c1331a10e9ac8df72bb4ef",
  zipgeo: "https://api.openweathermap.org/geo/1.0/zip?zip=",
  citygeo: "https://api.openweathermap.org/geo/1.0/direct?q=",
  oneCall: "https://api.openweathermap.org/data/2.5/onecall?lat=",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [name, setName] = useState("");

  const iconURL = {
    base: "http://openweathermap.org/img/wn/",
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      if (!isNaN(query)) {
        fetch(`${api.zipgeo}${query}&APPID=${api.key}`)
          .then((res) => res.json())
          .then((location) => {
            console.log(location);
            let lat = location.lat;
            let long = location.lon;
            console.log(lat);
            console.log(long);

            return fetch(
              `${api.oneCall}${lat}&lon=${long}&exclude=minutelyhourlyalerts&units=imperial&appid=${api.key}`
            )
              .then((res) => res.json())
              .then((result) => {
                setLocation(location);
                setWeather(result);
                setName(location.name);
                // setQuery("");

                console.log(location);
                console.log("break");
                console.log(result);
              });
          });
      } else {
        fetch(`${api.citygeo}${query},usa&APPID=${api.key}`)
          .then((res) => res.json())
          .then((location) => {
            // setWeather(location);
            // setQuery("");
            console.log(location);
            let lat = location[0].lat;
            let long = location[0].lon;
            console.log(lat);
            console.log(long);

            return fetch(
              `${api.oneCall}${lat}&lon=${long}&exclude=minutelyhourlyalerts&units=imperial&appid=${api.key}`
            )
              .then((res) => res.json())
              .then((result) => {
                setLocation(location);
                setWeather(result);
                setName(location[0].name);
                // setQuery("");

                console.log(location);
                console.log("break");
                console.log(result);
              });
          });
      }
    }
  };

  const metricSearch = () => {
    if (!isNaN(query)) {
      fetch(`${api.zipgeo}${query}&APPID=${api.key}`)
        .then((res) => res.json())
        .then((location) => {
          console.log(location);
          let lat = location.lat;
          let long = location.lon;
          console.log(lat);
          console.log(long);

          return fetch(
            `${api.oneCall}${lat}&lon=${long}&exclude=minutelyhourlyalerts&units=metric&appid=${api.key}`
          )
            .then((res) => res.json())
            .then((result) => {
              setLocation(location);
              setWeather(result);
              setName(location.name);
              // setQuery("");

              console.log(location);

              console.log("break");
              console.log(result);
            });
        });
    } else {
      fetch(`${api.citygeo}${query},usa&APPID=${api.key}`)
        .then((res) => res.json())
        .then((location) => {
          // setWeather(location);
          // setQuery("");
          console.log(location);
          let lat = location[0].lat;
          let long = location[0].lon;
          console.log(lat);
          console.log(long);

          return fetch(
            `${api.oneCall}${lat}&lon=${long}&exclude=minutelyhourlyalerts&units=metric&appid=${api.key}`
          )
            .then((res) => res.json())
            .then((result) => {
              setLocation(location);
              setWeather(result);
              setName(location[0].name);
              // setQuery("");

              console.log(location);
              console.log("break");
              console.log(result);
            });
        });
    }
  };

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let currentTime = d.getHours() + ":" + d.getMinutes();

    return `${day} ${date} ${month} ${year} ${currentTime}`;
  };

  const today = new Date().getDay();
  var day = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var date = new Date();
  var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  var twoDays = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
  var threeDays = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.lat != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.current.temp) + "°"}
              </div>
              <div className="today-box">
                <div className="todayIcon">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`}
                    alt=""
                  />
                </div>
                <div className="conditions">
                  {weather.current.weather[0].main}
                </div>
                <div className="high">
                  High: {Math.round(weather.daily[0].temp.max)}°
                </div>
                <div className="low">
                  Low: {Math.round(weather.daily[0].temp.min)}°
                </div>
                <div className="feels">
                  Feels like: {Math.round(weather.current.feels_like)}°
                </div>
                <div className="humidity">
                  Humidity: {weather.current.humidity}%
                </div>
              </div>

              <div className="extended">
                <div className="day1">
                  {weekday[tomorrow.getDay()]}
                  <div className="d1icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.daily[1].weather[0].icon}.png`}
                      alt=""
                    />
                  </div>
                  <div className="d1hi">
                    High: {Math.round(weather.daily[1].temp.max)}°
                  </div>
                  <div className="d1lo"></div>Low:{" "}
                  {Math.round(weather.daily[1].temp.min)}°
                  <div className="d1feels"></div>Feels like:{" "}
                  {Math.round(weather.daily[1].feels_like.day)}°
                </div>

                <div className="day2">
                  {weekday[twoDays.getDay()]}
                  <div className="d2icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.daily[2].weather[0].icon}.png`}
                      alt=""
                    />
                  </div>
                  <div className="d2hi">
                    High: {Math.round(weather.daily[2].temp.max)}°
                  </div>
                  <div className="d2lo">
                    Low: {Math.round(weather.daily[2].temp.min)}°
                  </div>
                  <div className="d2feels">
                    Feels like: {Math.round(weather.daily[2].feels_like.day)}°
                  </div>
                </div>

                <div className="day3">
                  {weekday[threeDays.getDay()]}
                  <div className="d3icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.daily[3].weather[0].icon}.png`}
                      alt=""
                    />
                  </div>
                  <div className="d3hi">
                    High: {Math.round(weather.daily[3].temp.max)}°
                  </div>
                  <div className="d3lo">
                    Low: {Math.round(weather.daily[3].temp.min)}°
                  </div>
                  <div className="d3feels">
                    Feels like: {Math.round(weather.daily[3].feels_like.day)}°
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  metricSearch(query);
                  console.log(query);
                }}
              >
                Celcius button
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
export default App;
