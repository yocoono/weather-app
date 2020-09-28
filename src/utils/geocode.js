const request = require('request');

const mapbox_token = process.env.MAPBOX_ACCESS_TOKEN;

const geocode = (address, callback) => {
  const useAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${useAddress}.json?access_token=${mapbox_token}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Undable to connect to location service.', undefined);
    } else if (response.body.features.length === 0) {
      callback('Undabel to find location data.', undefined);
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        longtitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;;

// geocode('Tokyo', (error, data) => {
//   console.log('Error:', error)
//   console.log('Data:', data)
// })
