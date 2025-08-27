"use strict"
if (localStorage.getItem("logueado") !== "true") {
    
  window.location.href = "../../../../auth/index.html";
}
function cerrarSesion() {
  localStorage.removeItem("logueado");
  window.location.href = "../../../../auth/index.html";
}
let db;

if (!!window.indexedDB) {

    async function iniciar() {
        db = await conectarDB();
        await mostrarDatos();
        const nombre = document.getElementById("nombre");
        const valor = document.getElementById("valor");
        const guardar = document.getElementById("guardar");
        const borrar = document.getElementById("borrar");

        guardar.addEventListener("click", async function () {
            await grabarDato(nombre.value, valor.value);
            nombre.value = "";
            valor.value = "";
            nombre.focus();
        });
       
    }

    iniciar();
} else {
    alert("El uso de storage está desactivado en tu navegador.");
}