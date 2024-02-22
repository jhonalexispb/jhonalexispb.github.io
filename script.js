document.addEventListener("DOMContentLoaded", function() {
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const main = document.getElementById("medicamentos");
        let currentLaboratory = null;
        let currentLineaMedicinal = null;
        let currentContainer = null;
        let productsInRow = 0;

        data.forEach(medicamento => {
            if (medicamento.laboratorio !== currentLaboratory) {
                currentLaboratory = medicamento.laboratorio;

                // Crear un nuevo contenedor para el laboratorio
                currentContainer = document.createElement("div");
                currentContainer.classList.add("laboratory-container");
                currentContainer.setAttribute("data-linea", currentLaboratory);
                main.appendChild(currentContainer);

                // Crear un encabezado para el laboratorio
                const imageContainer = document.createElement("div");
                imageContainer.classList.add("image-container");
                imageContainer.style.backgroundImage = `url(${medicamento.imagen})`; // URL de la imagen del laboratorio
                currentContainer.appendChild(imageContainer);

                // Reiniciar el contador de productos por fila
                productsInRow = 0;
            }
            
            if (medicamento.linea_medicinal !== currentLineaMedicinal) {
                currentLineaMedicinal = medicamento.linea_medicinal;

                // Crear un contenedor para la línea medicinal si no existe
                if (!currentContainer.querySelector(`.linea-medicinal[data-linea="${currentLineaMedicinal}"]`)) {
                    const lineaMedicinalContainer = document.createElement("div");
                    lineaMedicinalContainer.classList.add("linea-medicinal");
                    lineaMedicinalContainer.setAttribute("data-linea", currentLineaMedicinal);
                    lineaMedicinalContainer.classList.add(`linea-medicinal-${currentLaboratory.replace(/\s+/g, '-')}`); // Agregar clase de color basada en el laboratorio
                    currentContainer.appendChild(lineaMedicinalContainer);

                    // Crear un div para el texto de la línea medicinal
                    const lineaMedicinalText = document.createElement("div");
                    lineaMedicinalText.classList.add("cintaLinea");
                    lineaMedicinalText.setAttribute("data-linea", currentLaboratory);
                    lineaMedicinalText.textContent = currentLineaMedicinal;
                    lineaMedicinalContainer.appendChild(lineaMedicinalText);
                }
            }

            // Agregar el producto al contenedor de la línea medicinal actual
            const currentLineaMedicinalContainer = currentContainer.querySelector(`.linea-medicinal[data-linea="${currentLineaMedicinal}"]`);
            if (currentLineaMedicinalContainer) {
                const medicamentoContainer = document.createElement("div");
                medicamentoContainer.classList.add("medicamento");

                // Estilo para el contenedor de medicamento
                medicamentoContainer.style.border = "1px solid #ccc";
                medicamentoContainer.style.position = "relative";

                // Contenido del contenedor de medicamento
                medicamentoContainer.innerHTML = `
                    <div class="producto-info">
                        <div class="producto-nombre" data-linea="${currentLaboratory}">${medicamento.nombre}</div>
                        <div class="producto-descripcion">${medicamento.descripcion}</div>
                        <div class="producto-categoria">${medicamento.categoria}</div>
                       
                    </div>
                    <img id="imagen_producto" src="imagenes/dropesac/productos/KELEXYN.jpg" />
                    <img id="logoboned" src="imagenes/logotipo.png" />
                    <div class="precio">${medicamento.precio}</div> <!-- Precio -->
                    <img id="globo_precio" src="imagenes/precio.png" />
                `;

                const rows = currentLineaMedicinalContainer.querySelectorAll(".row-container");
                if (productsInRow === 0 || rows.length === 0) {
                    const rowContainer = document.createElement("div");
                    rowContainer.classList.add("row-container");
                    currentLineaMedicinalContainer.appendChild(rowContainer);
                    rowContainer.appendChild(medicamentoContainer);
                } else {
                    const currentRow = rows[rows.length - 1];
                    currentRow.appendChild(medicamentoContainer);
                }

                // Incrementar el contador de productos por fila y verificar si se necesita crear una nueva fila
                productsInRow++;
                if (productsInRow === 2) {
                    productsInRow = 0; // Reiniciar el contador de productos por fila
                }
            }
        });
    })
    .catch(error => console.error("Error al cargar los medicamentos", error));
});











