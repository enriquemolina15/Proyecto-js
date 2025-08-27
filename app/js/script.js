if (localStorage.getItem("logueado") !== "true") {
    
  window.location.href = "../auth/index.html";
}
function cerrarSesion() {
  localStorage.removeItem("logueado");
  window.location.href = "../auth/index.html";
}
function volverLanding() {
  localStorage.removeItem("logueado");
  window.location.href = "../index.html";
}