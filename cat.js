
document.addEventListener("DOMContentLoaded", function() {


    const laboratorios = [
        "1 dropesac.json",
        "2 terbol.json",
        "3 tobal.json",
        "4 qmpharma.json",
        "5 lyafarm.json",
        "6 nordic.json",
        "7 induquimica.json",
        "7 induquimica generico.json",
        "8 medical store.json",
        "9 diphasac.json",
        "9 diphasac generico.json",
        "10 ajrlabs.json",
        "11 labofar.json",
        "12 labogen.json",
        "13 emcure.json",
        "14 sevenpharma.json",
        "15 medikar.json",
        "25 arial.json",
        "16 carnot.json",
        "17 gedeon.json",
        "18 eurofarma.json",
        "19 dkt.json",
        "20 perufar.json",
        "21 jps.json",
        "22 otarvasq.json",
        "23 dany.json",
        "24 caferma.json"];

let contador = 0;
for (let i = 0; i < laboratorios.length; i++) {

    let nutria;
    fetch(laboratorios[i])
      .then(response => response.json())
      .then(data => {
            const main = document.getElementById("medicamentos");
            let labActual = null;
            let lineaActual = null;
            let laboratorio = null;
            let linea = null;
            let row;
           
            let fila = 0;

            data.forEach(producto => {

                if(producto.laboratorio !== labActual){
                    labActual = producto.laboratorio;
                    
                    laboratorio = document.createElement("div");
                    laboratorio.id = producto.laboratorio;
                    laboratorio.className = "laboratory-container";
                    /* laboratorio.setAttribute("data-linea", labActual); */
                    main.appendChild(laboratorio);

                    let labImagen = document.createElement("div");
                    labImagen.className = "image-container";
                    labImagen.style.backgroundImage = `url(${producto.imagen})`;
                    laboratorio.appendChild(labImagen);

                    

                    fila = 0;
                }

                if (producto.linea_medicinal !== lineaActual){
                    lineaActual = producto.linea_medicinal;

                    linea = document.createElement("div");
                    linea.className = "linea-medicinal";
                    linea.setAttribute("data-linea", lineaActual);
                    laboratorio.appendChild(linea);

                    let textLinea = document.createElement("div");
                    textLinea.className = "cintaLinea";
                    textLinea.setAttribute("data-linea", labActual);
                    textLinea.textContent = lineaActual;
                    linea.appendChild(textLinea);

                    fila = 0;

                }

                    if(fila === 0){

                    row = document.createElement("div");
                    row.classList.add("row-container");
                    linea.appendChild(row);
                
                    }

                    let contProducto = document.createElement("div");

                    contProducto.className = "medicamento";
                    contProducto.style.position = "relative";
                    contProducto.innerHTML = `
                        <div class="producto-info">
                            <div class="producto-nombre" data-linea="${labActual}">${producto.nombre}</div>
                            <div class="producto-descripcion">${producto.descripcion}</div>
                            <div class="producto-presentacion">${producto.presentacion}</div>
                            <div>
                                <img id="escala" src="imagenes/escala.png" style="display: ${producto.escala === 'no' ? 'none' : 'block'};" />
                            </div>
                        </div>
                        <div id="contenerdor_imagen_principal" style="left: ${producto.tamaño_imagen}">
                        <div id="contenedor_imagen">
                        <img id="imagen_producto" src="${producto.imagen_producto}" />
                        </div>
                        </div>
                        <img id="logoboned" src="imagenes/logotipo.png" />
                        <img class="ocultarnutria" id="nutria${contador}"  src="imagenes/nutria.png" />
                        <div class="precio">${producto.precio}</div> <!-- Precio -->
                        <img id="globo_precio" src="imagenes/precio.png" />
                    `;
                    contador++;
                    row.appendChild(contProducto);
                    
                    if(fila === 1){
                        fila = 0;
                    }else{
                    fila++;
                    }

                

            });

            /* inicio(); */
            
      })
      .catch(error => console.error("Error al cargar los medicamentos", error));
}


let main = document.querySelector('#medicamentos');

for(let i = 1; i < 45; i++){
    let div = document.createElement("div");
    div.className = "imagen_flotando";
    div.id = "imagen"+i;
    div.style.background = "url('imagenes/fondo/"+i+".png')";
    div.style.backgroundSize = "cover";
    div.style.margin= "20px";
    div.style.position = "relative";
    div.style.zIndex = "-1";
    div.style.animation = "flotar 10s ease-in-out infinite";
    main.appendChild(div);
    inicio(div);  
}

function inicio(div) {
     
        div.style.position = 'absolute';
        div.style.top = Math.random() * 100 + '%';
        div.style.left = Math.random() * 100 + '%';
    
}


})

