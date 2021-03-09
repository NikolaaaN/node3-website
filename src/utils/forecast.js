const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a3745ce7d6d122a6f5b652aa009592ce&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect!", undefined);
    } else if (body.error) {
      callback("Location not found!", undefined);
    } else {
      callback(undefined, {
        weather_description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feels_like: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
