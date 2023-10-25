window.onload = init;

function init() {
    if(localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "tallernode.html"
            });
    
        document.querySelector('.btn-primary').addEventListener('click', add);
    }
    else {
        window.location.href = "tallernode.html";
    }
}

function add() {
    var name = document.getElementById('input-name').value;
    var last_name = document.getElementById('input-last_name').value;
    var phone_number = parseInt(document.getElementById('input-phone_number').value);
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;
    var messageElement = document.getElementById('message');

    axios({
        method: 'post',
        url: 'http://localhost:3000/employee/',
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
        //Mensaje de éxito
        messageElement.textContent = 'Empleado creado exitosamente.';
        messageElement.style.color = 'green';
    }).catch(function(err){
        console.log(err);
        //Mensaje de error
        messageElement.textContent = 'Error al crear el empleado. Por favor, inténtalo de nuevo.';
        messageElement.style.color = 'red';
    })
}
