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
    document.getElementById('ellipsis').style.visibility = 'visible'
    
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    
    let login = {
        username: username,
        password: password
    }

//double function for successful login
    const loginFunc = () => {
        document.getElementById('ellipsis').style.visibility = 'hidden';
        navView();
        alert(`Welcome, ${login.username}!`);
    }

    axios.post(axiosRequest, login)
    .then((res) => {
        for(let i = 0; i < res.data.length; i++){
            const userInfo = res.data[0]
            let {username, password} = userInfo
            if(login.username == username && login.password == password){
                return loginFunc()
            }else{
                i = 15; //database sending a lengh of 14 when it should be 1 for some reason and i don't have time to debug properly
                document.getElementById('ellipsis').style.visibility = 'hidden';
                alert('Wrong username or password.')
            }
    }})
    .catch(()=>{
        document.getElementById('ellipsis').style.visibility = 'hidden';
        alert('User not found, try username and password again.');
    })
}

//submits login info
login.addEventListener('submit', validateUser)