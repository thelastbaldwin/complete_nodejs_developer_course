const request = require('request');

const forecast = (lat, long, callback) => {
    const darkskyUrl = `https://api.darksky.net/forecast/647bdbdc2c8fe958ea8166aecbd8090c/${lat},${long}`;
    request({url: darkskyUrl, json: true}, (error, response) => {
        if (error) {
            callback(new Error("Unable to connect to weather service!"));
        } else if (response.body.error){
            callback(new Error("Unable to find location!"));
        } else {
            const {
                currently : {
                    temperature,
                    precipProbability
                },
                daily: {
                    data: [
                        {
                            summary
                        }
                    ]
                }
            } = response.body;

            callback(undefined, {summary, temperature, precipProbability});
        }
    });
}

module.exports = forecast;