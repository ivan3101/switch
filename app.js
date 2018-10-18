const defaultTimeOut = 60000; // Tiempo en milisegundos para volver al estado OFF
const active = []; // Botones con cuenta regresiva activa

function switchOn(event, time = 1) {
    const button = event.target;

    if (!active.includes(button.id) && button !== null) {
        button.innerHTML = 'ON';
        button.classList.add('on');

        active.push(button.id);
        const timeToOff = defaultTimeOut * time;
        console.log(timeToOff);
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
    }
}