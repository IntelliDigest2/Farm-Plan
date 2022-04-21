import React, { useState, useEffect, useRef } from "react"

const accuweatherKey = "HCq07IWvsiEgRYm0Q6ZSgusqPdjXNBME" // accuweather - store this somewhere?
const locationFetchURL =
  "http://dataservice.accuweather.com/locations/v1/cities"
const weatherFetchURL =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"

const Weather = () => {
  const [location, setLocation] = useState("")
  const [headline, setHeadline] = useState("")

  const getWeather = (e) => {
    e.preventDefault()

    fetch(getLocationFetchURL())
      .then((res) => res.json())
      .then((data) => {
        // We will receivbe a different object structure depending on the query we performed
        let areaKeyCode = Array.isArray(data) ? data[0].Key : data.Key

        if (!areaKeyCode) return // If we don't have an area key code, we cannot fetch the weather
        fetch(weatherFetchURL + areaKeyCode + "?apikey=" + accuweatherKey)
          .then((response) => response.json())
          .then((data) => {
            setHeadline({ message: data.Headline.Text, class: "success" })
          })
          .catch((err) => {
            setHeadline({ message: "Weather fetch error", class: "danger" })
            console.error("Weather error: " + err)
          })
      })
      .catch((err) => {
        setHeadline({ message: "Geolocation fetch error", class: "danger" })
        console.error("Geolocation error: " + err)
      })
  }

  // Function to request the location of the user based on their browser GEO Location
  const getLocation = (e) => {
    e.preventDefault()
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(showPosition)
    else setLocation("Geolocation not supported")
  }

  // Function to submit the weather request with a given location
  const showPosition = (position) => {
    setLocation(position.coords.latitude + ", " + position.coords.longitude)
    document.getElementById("getWeather").click()
  }

  // Function to create the API request URL based on the location provided
  const getLocationFetchURL = () => {
    // This tests if we are sending a lat/lon address and updates the query accordingly
    let geoText =
      location.replace(/[^0-9]/g, "").length > 4 ? "/geoposition" : ""

    return (
      locationFetchURL +
      geoText +
      "/search?apikey=" +
      accuweatherKey +
      "&q=" +
      location
    )
  }

  return (
    <section id="weather">
      <h5 className="mt-3">Weather Forecast</h5>
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Location"
        className="p-1 pl-2"
        onChange={(e) => {
          setLocation(e.target.value)
        }}
        value={location}
      />
      <button
        id="getWeather"
        className="ml-3 mr-1 btn blue-btn"
        onClick={getWeather}
      >
        Get weather
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
