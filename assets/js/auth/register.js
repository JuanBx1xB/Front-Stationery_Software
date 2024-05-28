document.getElementById('form-register').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado

    // Recoger los datos del formulario
    const name = document.getElementById('inputName').value.trim();
    const lastname = document.getElementById('inputLastname').value.trim();
    const identification = parseInt(document.getElementById('inputIdentification').value.trim(), 10);
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value.trim();

    // Validación de un solo nombre y un solo apellido
    const nameParts = name.split(' ');
    const lastnameParts = lastname.split(' ');

    if (nameParts.length > 1) {
        showErrorModal('Por favor, ingrese solo un nombre.');
        return;
    }

    if (lastnameParts.length > 1) {
        showErrorModal('Por favor, ingrese solo un apellido.');
        return;
    }

    // Validación de contraseña con al menos un carácter especial
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
        showErrorModal('La contraseña debe contener al menos un carácter especial.');
        return;
    }

    // Crear el objeto de datos a enviar
    const data = {
        name,
        lastname,
        identification,
        username,
        password
    };

    try {
        // Verificar si el nombre completo, identificación o el nombre de usuario ya existen
        const checkResponse = await fetch(`https://08e34de0-73c5-49c9-9779-5f293c9b3574-00-15rkm6y886a5u.kirk.replit.dev/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (checkResponse.ok) {
            const users = await checkResponse.json();

            // Verificar si el nombre completo ya está registrado
            const nameLastnameExists = users.some(user => user.name === name && user.lastname === lastname);

            // Verificar si el nombre de usuario ya está en uso
            const usernameExists = users.some(user => user.username === username);

            // Verificar si la identificación ya está en uso
            const identificationExists = users.some(user => user.identification === identification);

            if (nameLastnameExists) {
                showErrorModal('El nombre y apellido ya están registrados.');
                return;
            }

            if (usernameExists) {
                showErrorModal('El nombre de usuario ya está en uso.');
                return;
            }

            if (identificationExists) {
                showErrorModal('La identificación ya está en uso.');
                return;
            }
        } else {
            showErrorModal('Error al verificar la existencia del usuario.');
            return;
        }

        // Hacer la solicitud a la API para registrar el usuario
        const response = await fetch('https://08e34de0-73c5-49c9-9779-5f293c9b3574-00-15rkm6y886a5u.kirk.replit.dev/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const newUser = await response.json();
            // Mostrar el modal de éxito
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
        } else {
            showErrorModal('Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        showErrorModal('Error al registrar el usuario');
    }
});

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('form-register').reset();
}

// Evento para limpiar el formulario al cerrar el modal
document.getElementById('successModal').addEventListener('hidden.bs.modal', limpiarFormulario);

// Función para mostrar el modal de error
function showErrorModal(message) {
    const errorModalBody = document.getElementById('errorModalBody');
    errorModalBody.textContent = message;
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}