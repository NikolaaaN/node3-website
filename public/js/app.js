console.log("Client side js file is laoded!");

const weatherForm = document.querySelector("form");

let messageOne = document.querySelector("#message-1");
let messageTwo = document.querySelector("#message-2");

const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent =
            data.forecastData.weather_description +
            " temperature: " +
            data.forecastData.temperature;
          //   console.log(data.location);
          console.log(data.forecastData.weather_description);
        }
      });
    }
  );
});
