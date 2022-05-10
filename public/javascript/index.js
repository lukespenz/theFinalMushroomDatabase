const axiosRequest = 'http://localhost:5555/login'
//`http://localhost:5555/login`
const username = document.getElementById('username')
const password = document.getElementById('password')
const login = document.getElementById('login')

const navView = () => {
    window.location.href='/views/viewMushrooms.html'
}


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
            console.log(userInfo)
            console.log(username)
            //alert(`Welcome ${username}!`)
        }
    })
    .catch(()=>alert('Wrong username or password, please try again'))
}

login.addEventListener('submit', validateUser)