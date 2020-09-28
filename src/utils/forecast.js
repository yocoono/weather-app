const request = require('request');

const app_id = process.env.FORECAST_APP_ID;

const forecast = (longtitude, latitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${app_id}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service.', undefined);
    } else if (body.weather.length === 0) {
      callback('Unable to find location data.', undefined);
    } else {
      const kToC = 273.15;
      const tempNow = Math.round(body.main.temp - kToC);
      const humidity = body.main.humidity;
      const weather = body.weather[0].main;
      const description = body.weather[0].description;
      const icon = body.weather[0].icon;
      const iconImgSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      callback(
        undefined,
        `
        <div class="results__title">${description}</div>
        <img src="${iconImgSrc}" class="results__icon">
        <p>Today's weather is <span class="lowercase">${weather}</span>.</p>
        <p>It is currently ${tempNow} degrees celsius.</p>
        <p>Humidity is ${humidity}%.</p>
      `
      );
    }
  });
};

module.exports = forecast;;

// forecast(139.77, 35.68, (error, data) => {
//   console.log('Error:', error)
//   console.log('Data:', data)
// })
