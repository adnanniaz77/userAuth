// user login
const register = document.querySelector("#register");
register.addEventListener("click", userRegistration);

// login function
function userRegistration() {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const errorMessage = document.querySelector(".error-message");
    const successMessage = document.querySelector(".successMessage");

    $.ajax({
        url: "/api/user/register",
        method: "POST",
        data: {
            name: name,
            email: email,
            password: password,
        },
    })
        .then((res) => {
            console.log(res);
            successMessage.textContent = "Successfully register new user, redirection to login..."

            if (res) {
                setTimeout(() => {
                    window.location = "/index.html";
                }, 3000);
            }
        })
        .catch((err) => {
            if (err) return (errorMessage.textContent = err.responseText);
        });
}