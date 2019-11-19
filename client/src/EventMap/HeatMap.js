/**
TAKEN AND MODIFIED FROM https://github.com/fullstackreact/google-maps-react/blob/master/dist/components/HeatMap.js
The MIT License (MIT)
Copyright (c) 2015 Fullstack.io <fullstack.io>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import React from 'react'
import PropTypes from 'prop-types'

function camelize(str) {
  return str.split(' ').map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};

const evtNames = ['click', 'mouseover', 'recenter'];

const wrappedPromise = function() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
}

export class HeatMap extends React.Component {

  componentDidMount() {
    this.heatMapPromise = wrappedPromise();
    this.renderHeatMap();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.positions !== prevProps.positions)) {
        if (this.heatMap) {
          this.heatMap.setMap(null);
          this.renderHeatMap();
        }
    }
  }

  componentWillUnmount() {
    if (this.heatMap) {
      this.heatMap.setMap(null);
    }
  }

  renderHeatMap() {
    const {
      map,
      google,
      positions,
      mapCenter,
      icon,
      gradient,
      radius = 20,
      opacity = 0.2,
      ...props
    } = this.props;

    if (!google) {
        return null;
    }

    const data = positions.map((pos) => {
        return {location: new google.maps.LatLng(pos.lat, pos.lng), weight:pos.weight}
    });

    const pref = {
      map,
      gradient,
      radius,
      opacity,
      data,
      ...props
    };

    this.heatMap = new google.maps.visualization.HeatmapLayer(pref);

    console.log(data);

    this.heatMap.set('radius', radius === undefined ? 20 : radius);

    this.heatMap.set('opacity', opacity === undefined ? 0.2 : opacity);

    evtNames.forEach(e => {
      this.heatMap.addListener(e, this.handleEvent(e));
    });

    this.heatMapPromise.resolve(this.heatMap);
  }

  getHeatMap() {
    return this.heatMapPromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.heatMap, e);
      }
    }
  }

  render() {
    return null;
  }
}

HeatMap.propTypes = {
  positions: PropTypes.array,
  map: PropTypes.object,
  icon: PropTypes.string
}

evtNames.forEach(e => HeatMap.propTypes[e] = PropTypes.func)

HeatMap.defaultProps = {
  name: 'HeatMap'
}

export default HeatMap
