import React from "react";

/**
 * This component handles the form data and management.
 */
class Form extends React.Component {
  state = { city: "", country: "", message: "yo" };
  /**
   * change handling for city textbox
   */
  updateCity = e => {
    this.setState({ city: e.target.value });
  };
  /**
   * change handling for country textbox
   */
  updateCountry = e => {
    this.setState({ country: e.target.value });
  };

  render() {
    return (
      <div className="center">
        <div className="row">
          <select
            id="selcity"
            className="browser-default col s3"
            onChange={this.props.changeCity}
          >
            {this.props.options()}
          </select>
          <div className="input-field col s1 ">
            <select onChange={this.props.changeUnit}>
              <option value="metric">C</option>
              <option value="imperial">F</option>
            </select>
            <label>Unit</label>
          </div>
          <div className="input-field col s3">
            <input
              onChange={e => {
                this.updateCity(e);
              }}
              value={this.state.city}
              placeholder="City Name"
              id="txtCity"
              type="text"
            />
          </div>
          <div className="input-field col s3">
            <input
              onChange={e => {
                this.updateCountry(e);
              }}
              value={this.state.country}
              placeholder="Country Code"
              id="txtCountry"
              type="text"
            />
          </div>
          <button
            className="btn-small waves-effect waves-light"
            style={{ marginTop: 20 }}
            onClick={() => {
              this.props.addCity(this.state.city, this.state.country);
              this.setState({ city: "", country: "" });
            }}
          >
            Add City
            <i className="material-icons right">add_circle</i>
          </button>
        </div>
        <div className="row">
          <div>{this.props.message}</div>
        </div>
      </div>
    );
  }
}

export default Form;
