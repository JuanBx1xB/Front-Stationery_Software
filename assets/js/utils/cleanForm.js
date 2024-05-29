document.getElementById('formSupport').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    const form = event.target;
    
    // Verifica la validez del formulario
    if (form.checkValidity()) {
        // Si el formulario es válido, muestra la modal manualmente
        const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        modal.show();

        // Limpia el formulario después de cerrar la modal
        document.getElementById('staticBackdrop').addEventListener('hidden.bs.modal', function () {
            limpiarFormulario();
        }, { once: true }); // Elimina el eventListener después de ejecutarlo una vez
    } else {
        // Si el formulario no es válido, muestra mensajes de error
        form.reportValidity();
    }
});

function limpiarFormulario() {
    // Seleccionamos el formulario por su ID y lo reseteamos
    document.getElementById("formSupport").reset();
}