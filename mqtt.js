const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

module.exports = (req, res) => {
    const { topic, message } = req.body;

    if (client.connected) {

        client.publish(topic, message, error => {

            if (error) {
                console.log(error);
                res
                    .status(500)
                    .json();

            } else {
                res
                    .status(204)
                    .json()
            }
        });
    }
};