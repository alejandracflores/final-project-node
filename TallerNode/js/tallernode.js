window.onload = init;

function init() {
    if(localStorage.getItem("token")) {
        loadEmployee();
    }
    else {
        window.location.href = "index.html";
    }
}

function loadEmployee() {
    axios({
        method: 'get',
        url: 'http://localhost:3000/employee/byname',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
    }).then(function (res) {
        console.log(res);
        displayemployee(res.data.message);
    }).catch(function (err) {
        console.log(err);
    });
}

function displayemployee(employees) {
    const detailsDiv = document.getElementById('employee-columns');
    detailsDiv.innerHTML = '';

    employees.forEach(employee => {
        detailsDiv.innerHTML += `
            <tr>
                <td>${employee.e_id}</td>
                <td>${employee.e_name}</td>
                <td>${employee.e_last_name}</td>
                <td>${employee.e_phone_number}</td>
                <td>${employee.e_email}</td>
                <td>${employee.e_address}</td>
                <td>
                    <button class="btn btn-warning">Editar</button>
                    <button class="btn btn-danger" data-id="${employee.e_id}">Eliminar</button>
                </td>
            </tr>`;
    });
}

  