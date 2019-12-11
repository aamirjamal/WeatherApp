import React from "react";
import Weather from "./components/Weather";
import Form from "./components/Form";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

const API_Key = "9e5bdec56439627aaa6a40d30f809fa2";

/**
 * Main App
 */
class App extends React.Component {
  /**
   * A lifecycle method which is called after render.
   */
  componentDidMount() {
    let selects = document.querySelectorAll("select");
    M.FormSelect.init(selects, {});
    const cityNames = JSON.parse(localStorage.getItem("cityNames"));
    if (cityNames) {
      console.log("Data present in local storage", cityNames);
    }
    cityNames &&
      this.setState({
        cityNames: cityNames,
        cityIds: JSON.parse(localStorage.getItem("cityIds"))
      });
  }

  /**
   * State of the application
   */
  state = {
    cityNames: [
      "Select City",
      "Dubai, AE",
      "Dallas, US",
      "Patna, IN",
      "Rochester, US",
      "Delhi, IN"
    ],
    cityIds: [0, 292223, 4190598, 1260086, 5043473, 1273294],
    cityId: 5043473,
    message: "",
    unit: "metric",
    day1: undefined,
    day2: undefined,
    day3: undefined,
    day4: undefined,
    day5: undefined
  };

  /**
   * A method to fill options.
   */
  options = () => {
    return this.state.cityNames.map((city, index) => {
      return (
        <option value={this.state.cityIds[index]} key={index}>
          {city}
        </option>
      );
    });
  };

  /**
   * Handles city change dropdown.
   */
  changeCity = e => {
    if (e.target.value !== "0") {
      this.setState({ cityId: e.target.value }, this.fetchWeather);
    }
  };

  /**
   * Handles unit change dropdown.
   */
  changeUnit = e => {
    this.setState({ unit: e.target.value }, this.fetchWeather);
  };

  /**
   * Handles addition of city
   */
  addCity = async (city, country) => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_Key}&units=${this.state.unit}`
    );
    const data = await api_call.json();
    console.log(data);
    if (data.cod !== "404") {
      this.setState({
        message: "City Added!"
      });

      const cityId = data.city.id;
      this.setState(
        {
          cityIds: [...this.state.cityIds, cityId],
          cityNames: [...this.state.cityNames, `${city}, ${country}`]
        },
        () => {
          localStorage.setItem(
            "cityNames",
            JSON.stringify(this.state.cityNames)
          );
          localStorage.setItem("cityIds", JSON.stringify(this.state.cityIds));
        }
      );
    } else {
      this.setState({
        message: "No such city/country"
      });
    }
  };

  /**
   * Asynchronous method to fetch weather data and display
   * accordingly.
   */
  fetchWeather = async () => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${this.state.cityId}&units=${this.state.unit}&appid=${API_Key}`
    );
    const data = await api_call.json();
    console.log(data);
    this.setState({
      message: "",
      day1: data.list[0],
      day2: data.list[8],
      day3: data.list[16],
      day4: data.list[24],
      day5: data.list[32]
    });
  };

  render() {
    return (
      <div className="container">
        <h3 className="center">Weather Finder</h3>
        <Form
          changeCity={this.changeCity}
          changeUnit={this.changeUnit}
          addCity={this.addCity}
          options={this.options}
          message={this.state.message}
        />
        <Weather data={this.state.day1} />
        <Weather data={this.state.day2} />
        <Weather data={this.state.day3} />
        <Weather data={this.state.day4} />
        <Weather data={this.state.day5} />
      </div>
    );
  }
}

export default App;
