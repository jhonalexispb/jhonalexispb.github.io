const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('newName');
const list = [];
render();
function createList(newNote){
    const p = document.createElement("p");
    const button = document.createElement("button");
    const divbutton = document.createElement("div");
    p.textContent = list[newNote];
    divbutton.className = "divButton";

    button.textContent = "Delete";
    button.className = "delete";
    button.addEventListener("click",function eraser(_event/*no usaremos event*/){
        list.splice(newNote,1);
        render();
    })
    divbutton.append(button);
    p.append(divbutton);
    return p;
    
}
function render(){
const divp = document.querySelector(".list");
divp.innerHTML = ""; //vaciamos el contenido de ol
for(let i = 0; i < list.length; i++){
    let p = createList(i);
    divp.append(p);
}
}
function handleSubmit(event){  //event es un objeto del documento que se genera
    event.preventDefault(); //accedemos a las propiedades del objeto event, este objeto por defecto actualiza la pagina, lo que hacemos es evitar que actualice
    const input = event.target.elements["New-Notes"].value;
    //const newDescription = input.elements["New-Notes"].value;//accedemos al valor que escribe el usuario
    if(input!==""){
    list.push(input);
    form.reset();//hacemos que el form se resetee
    render();}
}
const h1 = document.querySelector("h1");
h1.textContent = `Hello ${username}, wilcome to your notes`;
const form = document.querySelector("form");
form.addEventListener("submit",handleSubmit);


