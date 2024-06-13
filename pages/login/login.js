document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("#loginForm");
    const registerForm = document.querySelector("#registerForm");

    if (loginForm) {
        handleForm(loginForm, "../home/home.html");
    }

    if (registerForm) {
        handleForm(registerForm, ".../home/home.html");
    }

    function handleForm(form, redirectUrl) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = form.querySelector("[name='email']").value;
            const password = form.querySelector("[name='password']").value;
            const rememberMe = form.querySelector("[name='rememberMe']") ? form.querySelector("[name='rememberMe']").checked : false;
            const name = form.querySelector("[name='name']") ? form.querySelector("[name='name']").value : null;
            const lastName = form.querySelector("[name='lastName']") ? form.querySelector("[name='lastName']").value : null;

            // Expresión regular para validar el formato del email
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // Expresión regular para validar que la contraseña tenga al menos una letra y un número
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

            if (!emailPattern.test(email)) {
                showToast("errorToast", "Por favor, introduce un email válido.");
                return;
            }

            if (!passwordPattern.test(password)) {
                showToast("errorToast", "La contraseña debe tener al menos una letra, un número y al menos 6 caracteres.");
                return;
            }

            if (form.id === 'registerForm' && (!name || !lastName)) {
                showToast("errorToast", "Por favor, rellena todos los campos.");
                return;
            }

            if (email && password && (form.id !== 'registerForm' || (name && lastName))) {
                sessionStorage.setItem("userEmail", email);
                sessionStorage.setItem("rememberMe", rememberMe);
                
                if (form.id === 'registerForm') {
                    sessionStorage.setItem("userName", name);
                    sessionStorage.setItem("userLastName", lastName);
                }

                showToast("successToast", "Operación exitosa.");
                setTimeout(() => {
                    window.location.href = redirectUrl; // Redirecciona a la página correspondiente
                }, 1500); // Espera 1.5 segundos antes de redirigir
            } else {
                showToast("errorToast", "Por favor, rellena todos los campos.");
            }
        });
    }

    function showToast(toastId, message) {
        const toastElement = document.getElementById(toastId);
        const toastBody = toastElement.querySelector(".toast-body");
        toastBody.textContent = message;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
});
