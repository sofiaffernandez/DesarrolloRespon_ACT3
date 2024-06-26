document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("#loginForm");
    const registerForm = document.querySelector("#registerForm");

    if (loginForm) {
        handleForm(loginForm);
    }

    if (registerForm) {
        handleForm(registerForm);
    }

    function handleForm(form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = form.querySelector("[name='email']").value;
            const contraseña = form.querySelector("[name='contraseña']").value;
            const rememberMe = form.querySelector("[name='rememberMe']") ? form.querySelector("[name='rememberMe']").checked : false;
            const nombre = form.querySelector("[name='nombre']") ? form.querySelector("[name='nombre']").value : null;
            const apellidos = form.querySelector("[name='apellidos']") ? form.querySelector("[name='apellidos']").value : null;
            console.log("Email:", email);
            console.log("Contraseña:", contraseña);
            console.log("Recordarme:", rememberMe);
            console.log("Nombre:", nombre);
            console.log("Apellidos:", apellidos);

            // Expresión regular para validar el formato del email
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // Expresión regular para validar que la contraseña tenga al menos una letra y un número
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

            if (!emailPattern.test(email)) {
                showToast("errorToast", "Por favor, introduce un email válido.");
                return;
            }

            if (!passwordPattern.test(contraseña)) {
                showToast("errorToast", "La contraseña debe tener al menos una letra, un número y al menos 6 caracteres.");
                return;
            }

            if (form.id === 'registerForm' && (!nombre || !apellidos)) {
                showToast("errorToast", "Por favor, rellena todos los campos.");
                return;
            }

            if (email && contraseña && (form.id !== 'registerForm' || (nombre && apellidos))) {
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("rememberMe", rememberMe);
                
                if (form.id === 'registerForm') {
                    sessionStorage.setItem("nombre", nombre);
                    sessionStorage.setItem("apellidos", apellidos);
                }

                showToast("successToast", "Registro correcto.");
                setTimeout(() => {
                    window.location.href = "../home/home.html" ; 
                }, 1000); 
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
