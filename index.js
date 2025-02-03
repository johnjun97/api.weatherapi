import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const API_KEY = "5397416333af4e0dbce71610250302";
const location = "1.561851,103.734618";


app.get("/", async (req, res) => {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
    const response = await axios.get(url);

    res.render("index", { data: response.data }); 
  } catch (error) {
    console.error(error);
    res.render("index", { errorMessage: 'API request failed: ' + error.message });
  }
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", {});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
