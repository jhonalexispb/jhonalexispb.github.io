let username;

function handleSubmit(event){
    event.preventDefault();
    let nombreUsuario = event.target.elements["newName"].value;
    if(nombreUsuario!==""){
    username = nombreUsuario;
    window.location.href = "/html/notas.html?newName=" + encodeURIComponent(username);
    input.reset();
}
}
const input = document.querySelector(".forName");
input.addEventListener("submit",handleSubmit);



