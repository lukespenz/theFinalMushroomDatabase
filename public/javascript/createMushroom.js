//input variables
const mushroomForm = document.querySelector("#mushroom-form")
const submitButton = document.querySelector('#add-mushroom-button')
const navCreateMushroom = document.getElementById("#createMushroom")
const navViewMushrooms = document.getElementById("#viewMushrooms")

//nav bar buttons to change webpage
const navCreate = () => {
window.location.href='../views/createMushrooms.html'
}

const navView = () => {
    window.location.href='../views/viewMushrooms.html'
}

//indents current page bottom
const navPage = document.getElementById('createMushroom')
navPage.style.backgroundColor = '#464343';

//clears placeholder for textbox
const clearTxt = () => {
    const textField = document.getElementById('notes')
    textField.value == 'Enter text here...' ?
        textField.value = "" :
        false
}

//axios requests
const axiosRequest = `/api/public/views/viewMushrooms`
const errCallback = err => console.log(err)

//creates mushroom objects
class Mushroom {
    constructor(image_url, mushroom_name, location, date, who, altitude, habitat, substrate, spore_print, edible, psychoactive, notes){
    this.image_url = image_url,
    this.mushroom_name = mushroom_name,
    this.location = location,
    this.date = date,
    this.who = who,
    this.altitude = altitude,
    this.habitat = habitat,
    this.substrate = substrate, 
    this.spore_print = spore_print,
    this.edible = edible,
    this.psychoactive = psychoactive,
    this.notes = notes
    }
} 

//inserts values into an object and adds to sequelize database
const captureForm = (e) => {
    e.preventDefault()
    document.getElementById('ellipsis').style.visibility = 'visible';

    let photo = document.getElementById('photo').value
    let name = document.getElementById('name').value
    let location = document.getElementById('location').value
    let date = document.getElementById('date').value
    let who = document.getElementById('who').value
    let altitude = document.getElementById('altitude').value
    let habitat = document.getElementById('habitat').value
    let substrate = document.getElementById('substrate').value
    let spore_print = document.getElementById('spore_print').value
    let edible = document.getElementById('edible').checked
    let psychoactive = document.getElementById('psychoactive').checked
    let notes = null

    //to ignore placeholder text
    document.getElementById('notes').value === 'Enter text here...' ?
    notes = '' :
    notes = document.getElementById('notes').value

    altitude === "" ? altitude = null : false //changes from "" to null so sequelize still works
    
    let newMushroom = new Mushroom(photo, name, location, date, who, altitude, habitat, substrate, spore_print, edible, psychoactive, notes)

    axios.post(axiosRequest, newMushroom).then(() => {
        document.getElementById('ellipsis').style.visibility = 'hidden';
        alert('Mushroom successfully submitted!')
        window.location.replace(`/views/viewMushrooms.html`)
    }).catch(errCallback)
}

//submits mushroom information when button clicked
mushroomForm.addEventListener('submit', captureForm)