//manipulated elements
const mushroomForm = document.querySelector("#mushroom-form")
const submitButton = document.querySelector('#add-mushroom-button')
const navCreateMushroom = document.getElementById("#createMushroom")
const navViewMushrooms = document.getElementById("#viewMushrooms")

//nav bar buttons & clear notes placeholder text functions
const navCreate = () => {
window.location.href='../views/createMushrooms.html'
}

const navView = () => {
    window.location.href='../views/viewMushrooms.html'
}

const clearTxt = () => {
    const textField = document.getElementById('notes')
    textField.value == 'Enter text here...' ?
        textField.value = "" :
        false
}

//axios requests
const axiosRequest = `http://localhost:5555/api/public/views/viewMushrooms`
const errCallback = err => console.log(err)

//
function eraseText() {
    document.getElementById("notes").value = "";
}

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

//activates when add mushroom button pressed and inserts values into an object and adds to sequelize database
const captureForm = (e) => {
    e.preventDefault()

    //not grabbing these values vv
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
    let notes = document.getElementById('notes').value

    altitude === "" ? altitude = null : false //changes from "" to null so sequelize still works
    
    let newMushroom = new Mushroom(photo, name, location, date, who, altitude, habitat, substrate, spore_print, edible, psychoactive, notes)

    axios.post(axiosRequest, newMushroom).then(() => {
        window.location.replace(`http://localhost:5555/views/viewMushrooms.html`)
    }).catch(errCallback)
}

    mushroomForm.addEventListener('submit', captureForm)