import React, { Component } from "react";
import MapContainer from "./map.jsx";

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      long: "",
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      // this.setState({
      //   lat: position.coords.latitude,
      //   long: position.coords.longitude,
      // });
      localStorage.setItem("lat", position.coords.latitude);
      localStorage.setItem("long", position.coords.longitude);
    });
  }

  render() {
    return (
      <div>
        {console.log("HELLO")}
        {console.log(this.state.lat)}
        <h4>Using geolocation JavaScript API in React</h4>
        <MapContainer lat={this.state.lat} long={this.state.long} />
      </div>
    );
  }
}

export default CurrentLocation;
