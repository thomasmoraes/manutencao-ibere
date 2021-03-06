import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};
export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      // eslint-disable-next-line react/no-string-refs
      const mapRef = this.refs.map;

      // reference to the actual DOM element
      // eslint-disable-next-line react/no-find-dom-node
      const node = ReactDOM.findDOMNode(mapRef);
      let { zoom } = this.props;

      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const styles = [
        {
          featureType: 'administrative',
          elementType: 'all',
          styles: [
            {
              visibility: 'on'
            },
            {
              saturation: -100
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'all',
          stylers: [
            {
              visibility: 'on'
            },
            {
              saturation: -100
            },
            {
              lightness: 40
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [
            {
              visibility: 'on'
            },
            {
              saturation: -10
            },
            {
              lightness: 30
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'all',
          stylers: [
            {
              visibility: 'simplified'
            },
            {
              saturation: -60
            },
            {
              lightness: 10
            }
          ]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'all',
          stylers: [
            {
              visibility: 'simplified'
            },
            {
              saturation: -60
            },
            {
              lightness: 60
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [
            {
              visibility: 'off'
            },
            {
              saturation: -100
            },
            {
              lightness: 60
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'all',
          stylers: [
            {
              visibility: 'off'
            },
            {
              saturation: -100
            },
            {
              lightness: 60
            }
          ]
        }
      ];
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          styles: styles
        }
      );
      this.map = new maps.Map(node, mapConfig);
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);

    return (
      <div>
        {/* eslint-disable-next-line react/no-string-refs */}
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -30.0277,
    lng: -51.228
  },
  centerAroundCurrentLocation: false,
  visible: true
};
