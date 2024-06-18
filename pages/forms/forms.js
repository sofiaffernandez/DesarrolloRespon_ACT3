document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('datosform');
    const emailInput = document.getElementById('InputEmail');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');

    const storedEmail = sessionStorage.getItem('email');
    const storedNombre = sessionStorage.getItem('nombre');
    const storedApellidos = sessionStorage.getItem('apellidos');

    if (storedEmail) {
        emailInput.value = storedEmail;
    }
    if (storedNombre) {
        nombreInput.value = storedNombre;
    }
    if (storedApellidos) {
        apellidosInput.value = storedApellidos;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = nombreInput.value.trim();
        const apellidos = apellidosInput.value.trim();
        const email = emailInput.value.trim();
        const telefono = form.querySelector("[name='telefono']").value.trim();
        const direccion = form.querySelector("[name='dirección']").value.trim();
        const cp = form.querySelector("[name='cp']").value.trim();
        const ciudad = form.querySelector("[name='ciudad']").value.trim();

        if (!email || !nombre || !apellidos || !telefono || !direccion || !cp || !ciudad) {
            showToast("errorToast", "Por favor, rellena todos los campos.");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            showToast("errorToast", "Por favor, introduce un email válido.");
            return;
        }

        sessionStorage.setItem('email', email);
        sessionStorage.setItem('nombre', nombre);
        sessionStorage.setItem('apellidos', apellidos);

        showToast("successToast", "Datos guardados correctamente.");
        setTimeout(() => {
            window.location.href = '../home/home.html'; 
        }, 1000);
    });

    
    function showToast(id, message) {
        const toast = document.getElementById(id);
        const toastBody = toast.querySelector('.toast-body');
        toastBody.textContent = message;
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    
    const cancelBtn = document.querySelector('.btn-secondary');
    cancelBtn.addEventListener('click', function() {
        showToast("errorToast", "Compra cancelada.");
        setTimeout(() => {
            window.location.href = '../home/home.html'; 
        }, 1000);
    });
});
