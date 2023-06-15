// Getting Current Location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Unsupported Location");
  }
}

// Fetching & Set Current Data
function showPosition(position) {
  let location = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  console.log(location);
  let url =
    "https://api.weatherapi.com/v1/forecast.json?key=3e50610d34e14a7f90180505231405&q=" +
    location.latitude +
    "," +
    location.longitude;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let city = data.location.name;
      let temp = data.current.temp_c;
      let localTime = data.location.localtime;
      let locationText = data.current.condition.text;
      let locationIcon = data.current.condition.icon;

      console.log(data.current.condition.icon);

      document.querySelector(".name").innerHTML = city;
      document.querySelector(".temp").innerHTML = temp + "&#176";
      document.querySelector(".date").innerHTML = localTime;
      document.querySelector(".conditon").innerHTML = locationText;
      document.querySelector(".icon").src = locationIcon;

      switch (locationText) {
        case "Partly cloudy":
          document.getElementsByClassName("weather-app")[0].style.background =
            "url(images/day/valentin-muller-bWtd1ZyEy6w-unsplash.jpg)";
          document.getElementsByClassName(
            "weather-app"
          )[0].style.backgroundSize = "cover";
          break;

        default:
          document.getElementsByClassName("weather-app")[0].style.background =
            "url(images/day/michael-diane-weidner-h-rP5KSC2W0-unsplash.jpg)";
          document.getElementsByClassName(
            "weather-app"
          )[0].style.backgroundSize = "cover";
          break;
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
}

// Listener to Search Button

document.addEventListener("DOMContentLoaded", getLocation);
