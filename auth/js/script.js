"use strict";

const USUARIO_VALIDO = "admin";
const CLAVE_VALIDA = "1234";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const mensajeError = document.getElementById("mensajeError");

  if (!usuario || !clave) {
    mensajeError.textContent = "Completa todos los campos.";
    return;
  }

  if (usuario === USUARIO_VALIDO && clave === CLAVE_VALIDA) {
    localStorage.setItem("logueado", "true");
     console.log("LocalStorage actualizado:", localStorage);
    window.location.href = "../app/index.html";
  } else {
    mensajeError.textContent = "Usuario o contraseña incorrectos.";
  }
});
