const defaultTimeOut = 60000; // Tiempo en milisegundos para volver al estado OFF
const active = []; // Botones con cuenta regresiva activa

function switchOn(event, time = 1) {
    const button = event.target;

    if (!active.includes(button.id) && button !== null) {
        button.innerHTML = 'ON';
        button.classList.add('on');

        active.push(button.id);

        const parentId = button.parentElement.id;
        const topic = `/${parentId}/${button.id}`;
        const message = 'ON';

        emitMqttMsg(topic, message);

        const timeToOff = defaultTimeOut * time;
        setTimeout(switchOff, timeToOff, button);
    }
}

function switchOff(button) {
    if (button !== null) {
        button.innerHTML = 'OFF';

        if (button.classList.contains('on')) {
            button.classList.remove('on');
        }

        const index = active.indexOf(button.id);

        if (index !== -1) {
            active.splice(index, 1);
        }

        const parentId = button.parentElement.id;
        const topic = `/${parentId}/${button.id}`;
        const message = 'OFF';

        emitMqttMsg(topic, message);
    }
}

function emitMqttMsg(topic, message) {
    const url = `${window.location.href}mqtt`;

    if (topic && message) {

        const configRequest = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ topic, message })
        };

        return fetch(url, configRequest).then(response => response.json());
    }
}