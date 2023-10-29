window.onload = init;

function init() {
    if(localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "tallernode.html"
        });

        document.querySelector('.btn-warning').addEventListener('click', confirmEditing);
    }
    else {
        window.location.href = "tallernode.html";
    }
}

function confirmEditing() {
    if(confirm("¿Estás seguro de que quieres editarlo?")) {
        edit();
    }
}

function edit() {
    let id = document.getElementById('edit-input-id').value;

    var name = document.getElementById('edit-input-name').value;
    var last_name = document.getElementById('edit-input-lastname').value;
    var phone_number = parseInt(document.getElementById('edit-input-phone').value);
    var mail = document.getElementById('edit-input-email').value;
    var address = document.getElementById('edit-input-address').value;

    axios({
        method: 'put',
        url: 'http://localhost:3000/employee/' + id,
        data: {
            e_name: name,
            e_last_name: last_name,
            e_phone_number: phone_number,
            e_email: mail,
            e_address: address,
        },
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem("token"),
        }
        
    }).then(function(res) {
        console.log(res);
        alert("El empleado fue editado correctamente");
    }).catch(function(err){
        console.log(err);
        alert("Error al editar el empleado. Por favor, inténtalo de nuevo");
    })
}
