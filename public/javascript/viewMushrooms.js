const mushroomContainer = document.querySelector('#mushroom-container') //element where mushrooms will be placed
console.log(mushroomContainer)
const axiosRequest = `http://localhost:5555/api/public/views/viewMushrooms` //axios .get request link

const deleteMushroom = (id) => axios.delete(`${axiosRequest}/${id}`).then(window.location.replace(`http://localhost:5555/views/viewMushrooms.html`)).catch(errCallback)
const errCallback = err => console.log(err)

//nav bar buttons
const navCreate = () => {
    window.location.href='../views/createMushrooms.html'
    }
    
    const navView = () => {
        window.location.href='../views/viewMushrooms.html'
    }

//gets mushroom data from sequelize database
const displayMushrooms = () => {
    axios.get(axiosRequest)
    .then((res) => {
        for(let i = 0; i < res.data.length; i++){
            createMushroomCard(res.data[i])
        }
    })
}

//mushroom html insert
const createMushroomCard = (mushroom) => {
    const mushroomCard = document.createElement('div')
    mushroomCard.classList.add('mushroom-table')

    mushroom.psychoactive === true ?
    mushroomCard.innerHTML += `
    <img alt='mushroom-photo' src='${mushroom.image_url}' id="psychoactive" class="mushroom-photo"'/>
    ` :
    mushroomCard.innerHTML += `
    <img alt='mushroom-photo' src='${mushroom.image_url}' class="mushroom-photo"'/>
    `

    mushroomCard.innerHTML += `
    <table border="1px">
    <tr>
        <th>Mushroom Name</th>
        <th>Location</th>
        <th>Date</th>
        <th>Documentor</th>
        <th>Altitude</th>
        <th>Habitat</th>
        <th>Substrate</th>
        <th>Spore Print</th>
        <th>Edible</th>
        <th>Psychoactive</th>
        <th>Notes</th>
    </tr>
    <tr>
        <td>${mushroom.mushroom_name}</td>
        <td>${mushroom.location}</td>
        <td>${mushroom.date}</td>
        <td>${mushroom.who}</td>
        <td>${mushroom.altitude}</td>
        <td>${mushroom.habitat}</td>
        <td>${mushroom.substrate}</td>
        <td>${mushroom.spore_print}</td>
        <td>${mushroom.edible}</td>
        <td>${mushroom.psychoactive}</td>
        <td>${mushroom.notes}</td>
        </tr>
        </table>
    <button id="delete-button" onclick="deleteMushroom(${mushroom.mushroom_id})">delete</button>
    `

    mushroomContainer.appendChild(mushroomCard) //adds mushroom card to mushroom table in viewMushrooms.html
}


displayMushrooms();