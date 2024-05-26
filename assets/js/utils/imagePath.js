document.addEventListener('DOMContentLoaded', function() {
    let baseUrl = '';

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Si estás en un entorno local
        baseUrl = window.location.origin;
    } else {
        // Si estás en GitHub Pages
        const repoName = window.location.pathname.split('/')[1];
        baseUrl = window.location.origin + '/' + repoName;
    }

    // Obtener el enlace y actualizar su href
    const indexLink = document.getElementById('indexLink');
    indexLink.href = baseUrl + '/index.html';
});
