const getData = async() => {
    try {
        const response = await fetch('http://localhost:3000/czarnuch');

        if(!response.ok) console.error('Error')
        return response.json();

    } catch (err) {
        console.error(err)
    }
}

const offersContainer = document.getElementById('offersContainer');

window.addEventListener('load', async () => {
    const { data } = await getData();

    const offersContainer = document.getElementById('offersContainer');

    data.forEach(czarny => {
        const div = document.createElement('div');
        div.classList.add('offer');

        div.innerHTML = `
            <img src="${czarny.photo}" alt="${czarny.name}">
            <h3>${czarny.name}</h3>
            <p>${czarny.description}</p>
            <p class="price">${czarny.price}</p>
            <a href="contact.html" class="btn-offer">Skontaktuj się</a>
        `;

        offersContainer.appendChild(div);
    });
});