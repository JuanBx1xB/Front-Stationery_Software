document.getElementById('form-register').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado

    // Recoger los datos del formulario
    const name = document.getElementById('inputName').value;
    const lastname = document.getElementById('inputLastname').value;
    const identification = document.getElementById('inputIdentification').value;
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;

    // Crear el objeto de datos a enviar
    const data = {
        name,
        lastname,
        identification,
        username,
        password
    };

    try {
        // Hacer la solicitud a la API
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
            alert('Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar el usuario');
    }
});

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('form-register').reset();
}

// Evento para limpiar el formulario al cerrar el modal
document.getElementById('successModal').addEventListener('hidden.bs.modal', limpiarFormulario);