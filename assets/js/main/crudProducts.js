document.addEventListener("DOMContentLoaded", () => {
    fetch('https://08e34de0-73c5-49c9-9779-5f293c9b3574-00-15rkm6y886a5u.kirk.replit.dev/products')
        .then(response => response.json())
        .then(products => {
            const productTableBody = document.getElementById('productTableBody');
            productTableBody.innerHTML = ''; // Limpiar la tabla antes de insertar los datos

            products.forEach(product => {
                const row = document.createElement('tr');

                const productCodeCell = document.createElement('th');
                productCodeCell.scope = 'row';
                productCodeCell.textContent = product.productCode;

                const nameCell = document.createElement('td');
                nameCell.textContent = product.name;

                const priceCell = document.createElement('td');
                priceCell.textContent = product.price;

                const quantityCell = document.createElement('td');
                quantityCell.textContent = `${product.quantityAvailable} Unidades`;

                const actionsCell = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'me-2');
                editButton.textContent = 'Editar';
                editButton.setAttribute('data-bs-toggle', 'modal');
                editButton.setAttribute('data-bs-target', '#updateProductModal');
                editButton.onclick = () => {
                    document.getElementById('updateProductCode').value = product.productCode;
                    document.getElementById('updateProductName').value = product.name;
                    document.getElementById('updateProductPrice').value = product.price;
                    document.getElementById('updateProductQuantity').value = product.quantityAvailable;
                };

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn', 'btn-danger', 'mt-1', 'mt-xl-0');
                deleteButton.textContent = 'Eliminar';
                deleteButton.onclick = () => {
                    // Mostrar la modal de confirmación para eliminar el producto
                    const deleteConfirmationModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
                    deleteConfirmationModal.show();
                    
                    // Mostrar el nombre del producto en la modal de confirmación
                    document.getElementById('deleteProductName').textContent = product.name;

                    // Agregar evento click al botón de confirmación de eliminación
                    document.getElementById('confirmDeleteButton').onclick = () => {
                        deleteProduct(product.productCode);
                    };
                };

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);

                row.appendChild(productCodeCell);
                row.appendChild(nameCell);
                row.appendChild(priceCell);
                row.appendChild(quantityCell);
                row.appendChild(actionsCell);

                productTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al obtener los productos:', error));
});

function deleteProduct(productCode) {
    fetch(`https://08e34de0-73c5-49c9-9779-5f293c9b3574-00-15rkm6y886a5u.kirk.replit.dev/products/${productCode}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        return response.text();
    })
    .then(data => {
        // Cerrar la modal de confirmación
        const deleteConfirmationModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
        deleteConfirmationModal.hide();

        // Actualizar la lista de productos en la página
        location.reload();
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
}

document.getElementById('updateProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const productCode = document.getElementById('updateProductCode').value;
    const updatedProduct = {
        name: document.getElementById('updateProductName').value,
        price: document.getElementById('updateProductPrice').value,
        quantityAvailable: document.getElementById('updateProductQuantity').value
    };

    fetch(`https://08e34de0-73c5-49c9-9779-5f293c9b3574-00-15rkm6y886a5u.kirk.replit.dev/products/${productCode}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }
        return response.json();
    })
    .then(data => {
        // Cerrar la modal
        const updateProductModal = bootstrap.Modal.getInstance(document.getElementById('updateProductModal'));
        updateProductModal.hide();
        
        // Actualizar la tabla
        location.reload();
    })
    .catch(error => console.error('Error al actualizar el producto:', error));
});

document.querySelector('.btn-add').addEventListener('click', () => {
    // Mostrar la modal para agregar un nuevo producto
    const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    addProductModal.show();
});

document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores de los campos del formulario
    const productCode = document.getElementById('productCode').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productQuantity = document.getElementById('productQuantity').value;

    // Enviar solicitud POST al backend para agregar el nuevo producto
    fetch('https://08e34de0-73c5-49c9-9779-5f293c9b3574-00-15rkm6y886a5u.kirk.replit.dev/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productCode: productCode,
            name: productName,
            price: productPrice,
            quantityAvailable: productQuantity
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar el producto');
        }
        return response.json();
    })
    .then(newProduct => {
        // Cerrar la modal
        const addProductModal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        addProductModal.hide();
        
        // Actualizar la lista de productos
        updateProductList(newProduct);
    })
    .catch(error => console.error('Error al agregar el producto:', error));
});

function updateProductList(product) {
    const productTableBody = document.getElementById('productTableBody');
    const row = document.createElement('tr');

    const productCodeCell = document.createElement('th');
    productCodeCell.scope = 'row';
    productCodeCell.textContent = product.productCode;

    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;

    const priceCell = document.createElement('td');
    priceCell.textContent = product.price;

    const quantityCell = document.createElement('td');
    quantityCell.textContent = `${product.quantityAvailable} Unidades`;

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'me-2');
    editButton.textContent = 'Editar';
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#updateProductModal');
    editButton.onclick = () => {
        document.getElementById('updateProductCode').value = product.productCode;
        document.getElementById('updateProductName').value = product.name;
        document.getElementById('updateProductPrice').value = product.price;
        document.getElementById('updateProductQuantity').value = product.quantityAvailable;
    };

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Eliminar';

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(productCodeCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(actionsCell);

    productTableBody.appendChild(row);
}