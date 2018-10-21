const defaultTimeOut = 60000; // Tiempo en milisegundos para volver al estado OFF
const active = []; // Botones con cuenta regresiva activa
const client = mqtt.connect({
    host: '',
    port: 1883
});

function switchOn(event, time = 1, topicRoot, subTopic) {
    const button = event.target;
    const topic = `/${topicRoot}/${subTopic}`;

    if (!active.includes(button.id) && button !== null) {
        button.innerHTML = 'ON';
        button.classList.add('on');

        active.push(button.id);

        if (client.connected) {
            client.publish(topic, 'ON');
        }

        const timeToOff = defaultTimeOut * time;
        setTimeout(switchOff, timeToOff, button, topic);
    }
}

function switchOff(button, topic) {
    if (button !== null) {
        button.innerHTML = 'OFF';

        if (button.classList.contains('on')) {
            button.classList.remove('on');
        }

        if (client.connected) {
            client.publish(topic, 'OFF');
        }

        const index = active.indexOf(button.id);

        if (index !== -1) {
            active.splice(index, 1);
        }
    }
}
