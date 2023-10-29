document.addEventListener('DOMContentLoaded', function () {
    const editForm = document.getElementById('editForm');
    const employeeId = new URLSearchParams(window.location.search).get('id');

    // Obtener los datos del empleado a editar
    fetch(`/employee/${employeeId}`)
        .then(response => response.json())
        .then(data => {
            const { e_name, e_last_name, e_phone_number, e_email, e_address } = data;
            document.getElementById('name').value = e_name;
            document.getElementById('lastName').value = e_last_name;
            document.getElementById('phoneNumber').value = e_phone_number;
            document.getElementById('email').value = e_email;
            document.getElementById('address').value = e_address;
        });

    editForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        fetch(`/employee/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                e_name: name,
                e_last_name: lastName,
                e_phone_number: phoneNumber,
                e_email: email,
                e_address: address,
            }),
        })
        .then(response => {
            if (response.status === 200) {
                window.location.href = '/tallernode';
            } else {
                console.error('Error al actualizar los datos');
            }
        });
    });
});
