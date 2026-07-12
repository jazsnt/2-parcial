/* ===========================================
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

// Guarda si el diseño alternativo esta activado o no
let disenoAlternativo = false;

// Recorre el array de obras y arma el HTML de la galeria
function mostrarGaleria() {
  let html = "";

  for (let i = 0; i < obras.length; i++) {
    const obra = obras[i];

    html = html + "<div class='obra'>";
    html = html + "<img src='imagenes/" + obra.archivo + "' alt='" + obra.nombre + "' class='obra-imagen'>";
    html = html + "<p class='obra-nombre'>" + obra.nombre + "</p>";
    html = html + "<p class='obra-anio'>" + obra.anio + "</p>";
    html = html + "</div>";
  }

  contenedorGaleria.innerHTML = html;
}

mostrarGaleria();

// Cambia el diseño de la galeria: alterna el tamaño de las
// imagenes y los colores del texto
function cambiarDiseno() {
  disenoAlternativo = !disenoAlternativo;

  const imagenes = document.querySelectorAll(".obra-imagen");
  const nombres = document.querySelectorAll(".obra-nombre");
  const anios = document.querySelectorAll(".obra-anio");

  for (let i = 0; i < imagenes.length; i++) {
    if (disenoAlternativo) {
      imagenes[i].style.width = "20rem";
      imagenes[i].style.borderRadius = "0";
    } else {
      imagenes[i].style.width = "12rem";
      imagenes[i].style.borderRadius = "0.75rem";
    }
  }

  for (let i = 0; i < nombres.length; i++) {
    if (disenoAlternativo) {
      nombres[i].style.color = "rgb(70, 40, 57)";
      nombres[i].style.backgroundColor = "rgb(212, 210, 211)";
      anios[i].style.color = "rgb(70, 40, 57)";
      anios[i].style.backgroundColor = "rgb(212, 210, 211)";
    } else {
      nombres[i].style.color = "";
      nombres[i].style.backgroundColor = "";
      anios[i].style.color = "";
      anios[i].style.backgroundColor = "";
    }
  }
}

btnCambioDiseno.addEventListener("click", cambiarDiseno);