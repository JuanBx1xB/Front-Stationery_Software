document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const loginMessage = document.getElementById('login-message');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        // URL de tu API de login
        const apiUrl = 'http://localhost:3000/users/auth';

        // Opciones para la solicitud fetch
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        };

        // Hacer la solicitud a la API
        fetch(apiUrl, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Verificar si la respuesta es "Inicio de Sesión Exitoso!"
                if (data === 'Inicio de Sesión Exitoso!') {
                    // Redirigir a products.html después de un inicio de sesión exitoso
                    window.location.href = '/pages/main/home.html'; // Cambia a la URL de tu página de productos
                } 
            })
            .catch(error => {
                console.error('Error during login:', error);
                // Mostrar un mensaje de error genérico en la página
                loginMessage.textContent = 'Credenciales Incorrectas';
            });
    });
});
