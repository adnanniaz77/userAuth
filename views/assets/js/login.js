// user login
const login = document.querySelector('#login');
login.addEventListener('click', userLogin);

// login function
function userLogin() {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const errorMessage = document.querySelector('.error-message');

    $.ajax({
        url: '/api/user/login',
        method: 'POST',
        data: {
            email: email,
            password: password
        }
    }).then(res => {
        console.log(res)
        if (res) window.location = "home.html"
    }).catch(err => {
        console.log(err.responseText);
        if (err) return errorMessage.textContent = err.responseText;
    });
}
