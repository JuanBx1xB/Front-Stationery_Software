document.addEventListener('DOMContentLoaded', function() {
    // Recuperar los datos del usuario del almacenamiento local
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
        try {
            const user = JSON.parse(userJSON);
            // Mostrar el nombre y apellido en el elemento h3
            const nameElement = document.getElementById('name');
            nameElement.textContent = `${user.name} ${user.lastname},`;
        } catch (error) {
            console.error('Error parsing user JSON:', error);
        }
    } else {
        console.error('No user data found in localStorage');
    }
});