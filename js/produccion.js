/* Ejercicio: Gestion de produccion de instalaciones
   del estudio de Casey Reas*/

/*Variables globales*/

// Cantidad de instalaciones que el usuario indico que va a cargar
let cantidadInstalaciones = 0;

// Array de objetos: cada objeto representa una instalacion
// con sus propiedades nombre, personas y dias
let instalaciones = [];

// Datos generales del estudio
let horasPorDia = 0;
let valorHora = 0;

/*  Referencias a elementos del DOM  */

const inputCantidad = document.querySelector("#input-cantidad-instalaciones");
const btnConfirmarCantidad = document.querySelector("#btn-confirmar-cantidad");
const errorCantidad = document.querySelector("#error-cantidad");

const fieldsetInstalacion = document.querySelector("#fieldset-instalacion");
const contadorInstalaciones = document.querySelector("#contador-instalaciones");
const inputNombre = document.querySelector("#input-nombre-instalacion");
const inputPersonas = document.querySelector("#input-personas-instalacion");
const inputDias = document.querySelector("#input-dias-instalacion");
const btnAgregarInstalacion = document.querySelector("#btn-agregar-instalacion");
const errorInstalacion = document.querySelector("#error-instalacion");

const fieldsetDatosGenerales = document.querySelector("#fieldset-datos-generales");
const inputHorasDia = document.querySelector("#input-horas-dia");
const inputValorHora = document.querySelector("#input-valor-hora");
const btnConfirmarDatosGenerales = document.querySelector("#btn-confirmar-datos-generales");
const errorDatosGenerales = document.querySelector("#error-datos-generales");

const btnCalcular = document.querySelector("#btn-calcular");

const seccionResultados = document.querySelector("#seccion-resultados");
const resultadoCostoDia = document.querySelector("#resultado-costo-dia");
const resultadoMasDias = document.querySelector("#resultado-mas-dias");
const resultadoPorcentaje = document.querySelector("#resultado-porcentaje");
const btnReiniciar = document.querySelector("#btn-reiniciar");

/* ---------- Funcion auxiliar de validacion ---------- */

// Devuelve true si el valor es un numero valido y mayor a cero
function esNumeroPositivo(valor) {
  if (valor === "" || isNaN(valor) || Number(valor) <= 0) {
    return false;
  }
  return true;
}

/* ---------- Paso 1: confirmar cantidad de instalaciones ---------- */

function confirmarCantidad() {
  const valor = inputCantidad.value;

  if (!esNumeroPositivo(valor)) {
    errorCantidad.textContent = "Ingresá un número mayor a 0.";
    return;
  }

  errorCantidad.textContent = "";
  cantidadInstalaciones = Number(valor);

  // Se deshabilita este paso porque ya se confirmo
  inputCantidad.disabled = true;
  btnConfirmarCantidad.disabled = true;

  // Se habilita el paso siguiente
  fieldsetInstalacion.disabled = false;
  contadorInstalaciones.textContent = "Instalaciones cargadas: 0 de " + cantidadInstalaciones;
}

btnConfirmarCantidad.addEventListener("click", confirmarCantidad);

/* ---------- Paso 2: cargar cada instalacion ---------- */

function agregarInstalacion() {
  const nombre = inputNombre.value;
  const personas = inputPersonas.value;
  const dias = inputDias.value;

  if (nombre === "" || !esNumeroPositivo(personas) || !esNumeroPositivo(dias)) {
    errorInstalacion.textContent = "Completá el nombre, las personas y los días correctamente.";
    return;
  }

  errorInstalacion.textContent = "";

  // Armamos el objeto de la instalacion y lo agregamos al array
  const nuevaInstalacion = {
    nombre: nombre,
    personas: Number(personas),
    dias: Number(dias)
  };
  instalaciones.push(nuevaInstalacion);

  // Limpiamos los campos para cargar la siguiente
  inputNombre.value = "";
  inputPersonas.value = "";
  inputDias.value = "";

  contadorInstalaciones.textContent = "Instalaciones cargadas: " + instalaciones.length + " de " + cantidadInstalaciones;

  // Si ya se completo la cantidad indicada, se deshabilita este paso
  // y se habilita el paso de datos generales
  if (instalaciones.length === cantidadInstalaciones) {
    fieldsetInstalacion.disabled = true;
    fieldsetDatosGenerales.disabled = false;
  }
}

btnAgregarInstalacion.addEventListener("click", agregarInstalacion);

/* ---------- Paso 3: datos generales del estudio ---------- */

function confirmarDatosGenerales() {
  const horas = inputHorasDia.value;
  const valor = inputValorHora.value;

  if (!esNumeroPositivo(horas) || !esNumeroPositivo(valor)) {
    errorDatosGenerales.textContent = "Ingresá valores mayores a 0 en ambos campos.";
    return;
  }

  errorDatosGenerales.textContent = "";
  horasPorDia = Number(horas);
  valorHora = Number(valor);

  fieldsetDatosGenerales.disabled = true;

  // Recien ahora se habilita el boton de calcular
  btnCalcular.disabled = false;
}

btnConfirmarDatosGenerales.addEventListener("click", confirmarDatosGenerales);

/* ---------- Paso 4: calcular resultados ---------- */

function calcularResultados() {
  let totalPersonas = 0;
  let costoTotalEstudio = 0;

  // Usamos el patron de maximo para encontrar la instalacion
  // con mas dias de produccion
  let instalacionMasDias = instalaciones[0];

  for (let i = 0; i < instalaciones.length; i++) {
    const instalacionActual = instalaciones[i];

    totalPersonas = totalPersonas + instalacionActual.personas;

    const costoInstalacionActual = instalacionActual.personas * instalacionActual.dias * horasPorDia * valorHora;
    costoTotalEstudio = costoTotalEstudio + costoInstalacionActual;

    if (instalacionActual.dias > instalacionMasDias.dias) {
      instalacionMasDias = instalacionActual;
    }
  }

  // 1. Costo de un dia de trabajo del estudio completo
  const costoUnDia = totalPersonas * horasPorDia * valorHora;

  // 2. Costo total de la instalacion con mas dias de produccion
  const costoInstalacionMasDias = instalacionMasDias.personas * instalacionMasDias.dias * horasPorDia * valorHora;

  // 3. Porcentaje que representa esa instalacion sobre el costo total
  const porcentaje = (costoInstalacionMasDias / costoTotalEstudio) * 100;

  resultadoCostoDia.textContent = "Costo de un día de trabajo del estudio: $" + Math.round(costoUnDia);
  resultadoMasDias.textContent = "Instalación con más días de producción: " + instalacionMasDias.nombre + " (" + instalacionMasDias.dias + " días) - Costo total: $" + Math.round(costoInstalacionMasDias);
  resultadoPorcentaje.textContent = "Representa el " + Math.round(porcentaje) + "% del costo total del estudio.";

  seccionResultados.hidden = false;
  btnCalcular.disabled = true;
}

btnCalcular.addEventListener("click", calcularResultados);

/* ---------- Reiniciar ---------- */

function reiniciar() {
  // Reiniciamos las variables globales
  cantidadInstalaciones = 0;
  instalaciones = [];
  horasPorDia = 0;
  valorHora = 0;

  // Limpiamos todos los campos
  inputCantidad.value = "";
  inputNombre.value = "";
  inputPersonas.value = "";
  inputDias.value = "";
  inputHorasDia.value = "";
  inputValorHora.value = "";

  // Limpiamos mensajes de error
  errorCantidad.textContent = "";
  errorInstalacion.textContent = "";
  errorDatosGenerales.textContent = "";

  // Volvemos a habilitar el paso 1 y deshabilitar los siguientes
  inputCantidad.disabled = false;
  btnConfirmarCantidad.disabled = false;
  fieldsetInstalacion.disabled = true;
  fieldsetDatosGenerales.disabled = true;
  btnCalcular.disabled = true;

  contadorInstalaciones.textContent = "Instalaciones cargadas: 0 de 0";

  // Ocultamos los resultados
  seccionResultados.hidden = true;
}

btnReiniciar.addEventListener("click", reiniciar);