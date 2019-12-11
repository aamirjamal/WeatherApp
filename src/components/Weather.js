import React from "react";
import moment from "moment";

/**
 * This component handles displaying weather details for
 * a single day.
 * @param {Object} props
 */
export default function Weather(props) {
  if (props.data) {
    return (
      <div className="col s12 m7">
        <div className="card horizontal blue-grey darken-1">
          <div className="card-image">
            <img
              alt="icon"
              src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
            />
          </div>
          <div className="card-stacked">
            <div className="card-content white-text">
              <div className="row">
                <span className="col s3">
                  {moment(props.data.dt_txt).format("ddd, MMM D")}
                </span>
                <span className="col s3">
                  High: {props.data.main.temp_max}&deg;
                </span>
                <span className="col s3">Wind Speed:</span>
                <span className="col s3">Humidity:</span>
              </div>
              <div className="row">
                <span className="col s3">
                  {props.data.weather[0].description}
                </span>
                <span className="col s3">
                  Low: {props.data.main.temp_min}&deg;
                </span>
                <span className="col s3">{props.data.wind.speed} mph</span>
                <span className="col s3">{props.data.main.humidity}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
