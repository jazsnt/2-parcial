/* ===========================================
   galeria.js
   Genera la galeria de obras de Casey Reas
   y permite cambiar su diseño
   =========================================== */

// Array de objetos: cada objeto es una obra con
// su archivo de imagen, nombre y año
const obras = [
  { archivo: "obra-mathematical-theory.jpg", nombre: "A Mathematical Theory of Communication", anio: 2014 },
  { archivo: "obra-atoms.jpg", nombre: "ATOMS", anio: 2023 },
  { archivo: "obra-in-silico.jpg", nombre: "In Silico", anio: 2025 },
  { archivo: "obra-earthly-delights.jpg", nombre: "Earthly Delights 3.2", anio: 2024 },
  { archivo: "obra-technical-image.jpg", nombre: "Technical Image #2", anio: 2024 }
];

// Referencias al DOM
const contenedorGaleria = document.querySelector("#galeria-obras");
const btnCambioDiseno = document.querySelector("#btn-cambio-diseno");

// Recorre el array de obras y arma la galeria en el DOM
function mostrarGaleria() {
  for (let i = 0; i < obras.length; i++) {
    const obra = obras[i];

    // Tarjeta contenedora de cada obra
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("obra");

    // Imagen de la obra
    const imagen = document.createElement("img");
    imagen.src = "imagenes/" + obra.archivo;
    imagen.alt = obra.nombre;
    imagen.classList.add("obra-imagen");

    // Nombre de la obra
    const nombre = document.createElement("p");
    nombre.classList.add("obra-nombre");
    nombre.textContent = obra.nombre;

    // Año de la obra
    const anio = document.createElement("p");
    anio.classList.add("obra-anio");
    anio.textContent = obra.anio;

    // Armamos la tarjeta y la agregamos a la galeria
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(anio);
    contenedorGaleria.appendChild(tarjeta);
  }
}

mostrarGaleria();

// Cambia el diseño de la galeria (tamaño de imagenes y colores)
// agregando/sacando una clase que esta definida en el CSS
function cambiarDiseno() {
  contenedorGaleria.classList.toggle("galeria-obras-alt");
}

btnCambioDiseno.addEventListener("click", cambiarDiseno);