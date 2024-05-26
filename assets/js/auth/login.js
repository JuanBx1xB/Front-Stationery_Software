document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const loginMessage = document.getElementById('login-message');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        // URL de tu API de login
        const apiUrl = 'https://08e34de0-73c5-49c9-9779-5f293c9b3574-00-15rkm6y886a5u.kirk.replit.dev/users/auth';

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
                return response.json(); // Cambiado de response.text() a response.json()
            })
            .then(data => {
                // Verificar si la respuesta es "Inicio de Sesión Exitoso!"
                if (data.message === 'Inicio de Sesión Exitoso!') {
                    // Almacenar los datos del usuario en el almacenamiento local
                    localStorage.setItem('user', JSON.stringify(data.user));

                    let baseUrl = '';
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        // Si estás en un entorno local
                        baseUrl = window.location.origin;
                    } else {
                        // Si estás en GitHub Pages
                        const repoName = window.location.pathname.split('/')[1];
                        baseUrl = window.location.origin + '/' + repoName;
                    }

                    // Construye la ruta relativa a la página principal
                    const pathToHome = '/pages/main/home.html';
                    const redirectUrl = baseUrl + pathToHome;

                    // Redirige al usuario a la página principal
                    window.location.href = redirectUrl;
                } 
            })
            .catch(error => {
                console.error('Error during login:', error);
                // Mostrar un mensaje de error genérico en la página
                loginMessage.textContent = 'Credenciales Incorrectas';
            });
    });
});