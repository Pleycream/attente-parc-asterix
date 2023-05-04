async function fetchQueueTimes() {
    const apiUrl = 'https://queue-times.com/fr/parks/9/queue_times.json';
    const proxyUrl = 'https://proxy.cors.sh/';
    const apiKey = 'temp_7cdd87261c5d7909e4aa4f72332f358b';

    try {
        const response = await fetch(proxyUrl + apiUrl, {
            headers: {
                'x-cors-api-key': apiKey
            }
        });
        const data = await response.json();
        displayQueueTimes(data.rides);
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
    }
}

function displayQueueTimes(rides) {
    const rideContainer = document.createElement('div');
    rideContainer.classList.add('ride-container');

    const now = new Date();
    const parkOpeningHour = 10;
    const parkClosingHour = 19;
    const isParkOpen = now.getHours() >= parkOpeningHour && now.getHours() < parkClosingHour;

    rides.sort((a, b) => {
        if (a.name === "Toutatis") return -1;
        if (b.name === "Toutatis") return 1;
        if (a.is_open === b.is_open) {
            return a.wait_time - b.wait_time;
        }
        return a.is_open ? -1 : 1;
    });
    rides.forEach(ride => {
        const waitTimeColor = getWaitTimeColor(ride.wait_time);
        const isOpen = ride.is_open && isParkOpen;
        const lastUpdated = new Date(ride.last_updated).toLocaleString();
    const isNewRide = ride.name === "Toutatis";

        const rideItem = document.createElement('div');
        rideItem.classList.add('ride-item');

        const rideName = document.createElement('span');
        rideName.classList.add('ride-name');
        rideName.textContent = ride.name;

        const waitTime = document.createElement('span');
        waitTime.classList.add('wait-time');
    if (ride.name === "Toutatis") {
        waitTime.classList.add('always-pulse');
    }
        waitTime.style.backgroundColor = waitTimeColor;
        waitTime.textContent = isOpen ? `${ride.wait_time} minutes` : 'Fermé';

        const lastUpdatedElement = document.createElement('span');
        lastUpdatedElement.classList.add('last-updated');
        lastUpdatedElement.textContent = `Dernière mise à jour : ${lastUpdated}`;

        rideItem.appendChild(rideName);
        rideItem.appendChild(waitTime);
        rideItem.appendChild(lastUpdatedElement);

        rideContainer.appendChild(rideItem);
    if (isNewRide) {
rideItem.classList.add('featured-ride-item'); 
    }

    });

    document.getElementById('ride-list').appendChild(rideContainer);
}

function getWaitTimeColor(waitTime) {
    if (waitTime <= 10) {
        return '#27ae60';
    } else if (waitTime <= 30) {
        return '#f1c40f';
    } else {
        return '#e74c3c';
    }
}

fetchQueueTimes();
