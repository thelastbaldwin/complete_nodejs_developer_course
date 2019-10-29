const request = require('request');

const forecast = (lat, long, callback) => {
    const darkskyUrl = `https://api.darksky.net/forecast/647bdbdc2c8fe958ea8166aecbd8090c/${lat},${long}`;
    request({url: darkskyUrl, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!");
        } else if (body.error){
            callback("Unable to find location!");
        } else {
            const {
                currently : {
                    temperature,
                    precipProbability
                },
                daily: {
                    data: [
                        {
                            summary,
                            temperatureHigh,
                            temperatureLow,
                        }
                    ]
                }
            } = body;

            // callback(undefined, {summary, temperature, precipProbability});
            callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability * 100} chance of rain.
            The high is ${temperatureHigh} and the low is ${temperatureLow}.`);
        }
    });
}

module.exports = forecast;