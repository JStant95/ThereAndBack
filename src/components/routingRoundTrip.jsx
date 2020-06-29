import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import "lrm-graphhopper";

class RoutingRoundTrip extends MapLayer {
  render() {
    this.createLeafletElement();
    return "Hi";
  }

  createLeafletElement() {
    const { map, roundTripCoords, vehicle, splice } = this.props;
    var apiGraphHopper = process.env.REACT_APP_GRAPHHOPPER;

    var i;

    i += 1;

    let waypointsArr = [];
    waypointsArr.push(L.latLng(roundTripCoords[0][1], roundTripCoords[0][0]));
    roundTripCoords.forEach((item, i) => {
      if (i % 10 == 0) {
        let coord = L.latLng(item[1], item[0]);
        waypointsArr.push(coord);
      }
    });
    waypointsArr.push(
      L.latLng(
        roundTripCoords[roundTripCoords.length - 1][1],
        roundTripCoords[roundTripCoords.length - 1][0]
      )
    );

    let leafletElement = new L.Routing.control({
      waypoints: waypointsArr,

      router: L.Routing.graphHopper(apiGraphHopper, {
        urlParameters: {
          vehicle: vehicle,
        },
      }),
    }).addTo(map.leafletElement);
    console.log(splice);
    if (this.props.splice == true) {
      leafletElement.spliceWaypoints(0, 50);
    }

    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingRoundTrip);
