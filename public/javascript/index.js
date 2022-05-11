//input variables
const axiosRequest = 'http://localhost:5555/login'
const username = document.getElementById('username')
const password = document.getElementById('password')
const login = document.getElementById('login')

//changes webpage to viewMushrooms
const navView = () => {
    window.location.href='/views/viewMushrooms.html'
}

//login request to validate user
const validateUser = (e) => {
    e.preventDefault()

    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    let login = {
        username: username,
        password: password
    }

    axios.post(axiosRequest, login)
    .then((res) => {
        for(let i = 0; i < res.data.length; i++){
            const userInfo = res.data
            const {username} = userInfo
            //alert(`Welcome ${username}!`)
        }
    })
    .catch(()=>alert('Wrong username or password, please try again'))
}

//submits login info
login.addEventListener('submit', validateUser)