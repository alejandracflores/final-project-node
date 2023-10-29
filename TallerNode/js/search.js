window.onload = function() {
    document.getElementById('search-button').addEventListener('click', searchEmployee);

    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "tallernode.html"
        });
}

function searchEmployee() {
    let searchData = document.getElementById('search-input').value;
    let criteria = document.getElementById('search-criteria').value;

    if(!searchData) {
        alert('Por favor, ingrese un dato para buscar.');
        return;
    }

    let endpoint = `http://localhost:3000/employee/${searchData}`;
    if(criteria === 'id') {
        endpoint = `http://localhost:3000/employee/${searchData}`;
    } else if(criteria === 'name') {
        endpoint = `http://localhost:3000/employee/${searchData}`;
    }

    axios.get(endpoint, { headers: { Authorization: 'Bearer '+ localStorage.getItem("token"), } })
        .then(function(response) {
            displayEmployeeDetails(response.data.message[0]);
        })
        .catch(function(error) {
            alert(`Error: ${error.response.data.message}`);
            console.log(error);
        });
}

function displayEmployeeDetails(employee) {
    const detailsDiv = document.getElementById('employee-details');
    detailsDiv.innerHTML = `
        <strong>Nombre:</strong> ${employee.e_name}<br>
        <strong>Apellido:</strong> ${employee.e_last_name}<br>
        <strong>Teléfono:</strong> ${employee.e_phone_number}<br>
        <strong>Email:</strong> ${employee.e_email}<br>
        <strong>Dirección:</strong> ${employee.e_address}<br>
    `;
}
