// user login
const login = document.querySelector('#login');
login.addEventListener('click', userLogin);

// login function
function userLogin() {
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
    }).catch(err => {
        console.log(err.responseText);
        if (err) return errorMessage.textContent = err.responseText;
    });
}
