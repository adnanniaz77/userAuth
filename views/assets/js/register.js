// user login
const register = document.querySelector("#register");
register.addEventListener("click", userRegistration);

// login function
function userRegistration() {
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

            if (res) {
                successMessage.textContent = "Registered new user successfully";
                window.location = "/index.html";
            }
        })
        .catch((err) => {
            if (err) return (errorMessage.textContent = err.responseText);
        });
}
