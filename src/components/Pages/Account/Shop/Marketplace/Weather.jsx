import React, { useState, useEffect, useRef } from "react"

const Weather = () => {
  const [location, setLocation] = useState({ zip: "" })
  const [headline, setHeadline] = useState("")

  let openWeatherKey = "5e08f390d68d20c770a7727d2bafe3b1" // openweathermap API key - store this somewhere?

  const locationFetchURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${location.zip},GB&appid=${openWeatherKey}`
  const weatherFetchURL = `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly&&units=metric&lat=${location.lat}&lon=${location.lon}&&appid=${openWeatherKey}`

  const getWeatherFromPostCode = (e) => {
    e.preventDefault()

    fetch(locationFetchURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

        if (!data.zip) {
          setHeadline({ message: "Invalid postcal code", class: "danger" })
          return
        }

        setLocation({
          ...location,
          lat: data.lat,
          lon: data.lon,
        })
      })
      .catch((err) => {
        setHeadline({ message: "Geolocation fetch error", class: "danger" })
      })
  }

  useEffect(() => {
    if (!location.lat) return

    fetch(weatherFetchURL)
      .then((response) => response.json())
      .then((data) => {
        let weather = ""
        data.daily.forEach((day, i) => {
          weather += "Day " + (i + 1) + ": " + day.weather[0].main + " "
        })
        setHeadline({ message: weather, class: "success" })
      })
      .catch((err) => {
        setHeadline({ message: "Weather fetch error", class: "danger" })
      })
  }, [location.lat])

  // Function to request the location of the user based on their browser GEO Location
  const getLocation = (e) => {
    e.preventDefault()
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(updatePosition)
    else setHeadline({ message: "geolocation not supported", class: "danger" })
  }

  // Function to submit the weather request with a given location
  const updatePosition = (position) => {
    setLocation({
      ...location,
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    })
  }

  return (
    <section id="weather" className="mb-4">
      <h5 className="mt-3">Weather Forecast</h5>
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Post code"
        className="p-1 pl-2"
        onChange={(e) => {
          setLocation({ ...location, zip: e.target.value })
        }}
        value={location.zip}
      />
      <button
        id="getWeather"
        className="ml-3 mr-1 btn blue-btn"
        onClick={getWeatherFromPostCode}
      >
        Get weather for post code
      </button>
      <button className="btn green-btn" onClick={getLocation}>
        Use my location
      </button>
      {headline && (
        <p className={`alert alert-${headline.class} mb-2 mt-2`}>
          {headline.message}
        </p>
      )}
    </section>
  )
}

export default Weather
