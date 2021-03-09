const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partial");

//Setup handlebars enginee and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

//Setup static directory to serve

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather ",
    name: "Dzoni",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some text",
    title: "Help",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Dzoni",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("You must provide an address");
  }

  geocode.geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send(error);
    }

    const { location, latitude, longitude } = data;
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }

      res.send({
        location: location,
        forecastData: forecastData,
      });
    });
  });

  // res.send({
  //   forecast: "It is snwoing",
  //   location: "Philadelphia",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dzoni",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dzoni",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
