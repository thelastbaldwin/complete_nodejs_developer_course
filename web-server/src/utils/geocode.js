const request = require('request');

const geocode = (address, callback) => {
    const mapBoxKey = "pk.eyJ1IjoidGhlbGFzdGJhbGR3aW4iLCJhIjoiY2p1bGpzbWtkMHBubjN5bnhncW1tZXBqaiJ9.i6vs30vuU6vIuvKKWN_v9w";
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxKey}&limit=1`;

    request({url: mapBoxUrl, json: true}, (error, {body}) => {
            if (error){
                callback("Unable to connect to location services!");
            } else if (!body.features.length) {
                callback("Unable to find location. Try again with a different search term.");
            } else {
                const {
                    features: [
                        {
                            place_name: location,
                            center: [
                                long,
                                lat
                            ]
                        }
                    ]
                } = body

                callback(undefined, {lat,long, location});
            }
    });
}

module.exports = geocode;