import express from "express"
import * as dotenv from "dotenv"
import axios  from "axios";
const app = express();

dotenv.config();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async(req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey =process.env.API_KEY;

  // Add your logic here to fetch weather data from the API
  const ApiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  let weather;
  let error=null;
  try {
    const response=await axios.get(ApiUrl) ;
    weather=response.data;
  } catch (error) {
    weather=null;
    error="please try again"
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
